// js/state.js
const STATE_KEY_PREFIX = 'lpb_';

const State = {
  _key(code) {
    return STATE_KEY_PREFIX + code.trim().toLowerCase();
  },

  load(code) {
    const raw = localStorage.getItem(State._key(code));
    return raw ? JSON.parse(raw) : null;
  },

  save(code, data) {
    const toSave = { ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(State._key(code), JSON.stringify(toSave));
  },

  createNew(code) {
    const initial = {
      code: code.trim().toLowerCase(),
      globalSettings: {
        colorTheme: { main: '#6366f1', sub: '#a5b4fc', accent: '#f59e0b' },
        font: 'noto-sans',
      },
      globalSettingsDone: false,
      sections: {},       // { [sectionId]: { type, design, content, status } }
      sectionOrder: [],   // ['hero-1', 'mondai-1', ...] 順番を管理
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    State.save(code, initial);
    return initial;
  },

  addSection(code, type) {
    const data = State.load(code);
    const id = `${type}-${Date.now()}`;
    data.sections[id] = { type, design: null, content: {}, status: 'pending' };
    data.sectionOrder.push(id);
    State.save(code, data);
    return id;
  },

  updateSection(code, sectionId, updates) {
    const data = State.load(code);
    data.sections[sectionId] = { ...data.sections[sectionId], ...updates };
    const allDone = data.sectionOrder.length > 0 && data.sectionOrder.every(
      id => data.sections[id]?.status === 'done'
    );
    data.allDone = allDone;
    State.save(code, data);
  },

  updateOrder(code, newOrder) {
    const data = State.load(code);
    data.sectionOrder = newOrder;
    State.save(code, data);
  },

  deleteSection(code, sectionId) {
    const data = State.load(code);
    delete data.sections[sectionId];
    data.sectionOrder = data.sectionOrder.filter(id => id !== sectionId);
    const allDone = data.sectionOrder.length > 0 && data.sectionOrder.every(
      id => data.sections[id]?.status === 'done'
    );
    data.allDone = allDone;
    State.save(code, data);
  }
};
