// js/app.js
let currentCode = null;
let appState   = null;
let activeSectionId = null;

// --------------------------------------------------------
// 初期化
// --------------------------------------------------------
async function init() {
  UI.show('screen-auth');
  UI.renderAuth(async (code) => {
    const valid = await Auth.validate(code);
    if (!valid) {
      const errEl = document.getElementById('auth-error');
      if (errEl) errEl.textContent = '参加コードが違います。もう一度確認してください。';
      return;
    }
    currentCode = code;
    appState    = State.load(code) || State.createNew(code);

    if (!appState.globalSettingsDone) {
      showSettings();
    } else {
      renderBuilder();
    }
  });
}

// --------------------------------------------------------
// グローバル設定画面
// --------------------------------------------------------
function showSettings() {
  UI.show('screen-settings');
  UI.renderSettings(appState.globalSettings, (settings) => {
    appState.globalSettings = { ...appState.globalSettings, ...settings };
    appState.globalSettingsDone = true;
    State.save(currentCode, appState);
    renderBuilder();
  });
}

// --------------------------------------------------------
// ビルダー本体
// --------------------------------------------------------
function renderBuilder() {
  UI.show('screen-builder');

  // プレビューボタン有効化（ヒーロー＋CTAが揃ったら）
  const enablePreview = isPreviewReady();

  UI.renderBuilderShell(appState, {
    onAddSection(type) {
      const id = State.addSection(currentCode, type);
      appState = State.load(currentCode);
      renderBuilder();
      activateSection(id);
    },
    onSectionClick(sectionId) {
      activateSection(sectionId);
    },
    onDeleteSection(sectionId) {
      State.deleteSection(currentCode, sectionId);
      appState = State.load(currentCode);
      activeSectionId = null;
      renderBuilder();
    },
    onReorder() {
      appState = State.load(currentCode);
      renderSectionList();
    },
    onSettings() {
      showSettings();
    },
    onPreview() {
      if (!isPreviewReady()) return;
      showPreview();
    },
    enablePreview,
  });

  DragDrop.init(currentCode, () => {
    appState = State.load(currentCode);
  });

  // 直前に選択していたセクションを復元
  if (activeSectionId && appState.sections[activeSectionId]) {
    activateSection(activeSectionId);
  }
}

// サイドバーのみ再描画（ドラッグ後など）
function renderSectionList() {
  // 完全再描画で代替（軽量なので問題なし）
  renderBuilder();
}

// --------------------------------------------------------
// セクション選択 → 右パネルにフォームを表示
// --------------------------------------------------------
function activateSection(sectionId) {
  activeSectionId = sectionId;
  appState = State.load(currentCode);
  const sec = appState.sections[sectionId];
  if (!sec) return;

  const sectionConfig = SECTIONS_CONFIG[sec.type];
  const formConfig    = FORMS_CONFIG[sec.type];

  // デザインが未選択 → デザインピッカーを表示
  if (!sec.design) {
    UI.renderDesignPicker(sectionId, sectionConfig, null, (design) => {
      State.updateSection(currentCode, sectionId, { design });
      appState = State.load(currentCode);
      activateSection(sectionId); // コンテンツフォームへ
    });
    return;
  }

  // デザイン選択済 → インライン編集（WYSIWYG）を表示
  UI.renderInlineEditor(sectionId, sec, formConfig,
    (data) => { // onSave
      State.updateSection(currentCode, sectionId, { content: data, status: 'done' });
      appState = State.load(currentCode);
      // シェル全体を再描画してプレビューボタン有効化を反映
      renderBuilder();
    },
    () => { // onChangeDesign
      State.updateSection(currentCode, sectionId, { design: null });
      appState = State.load(currentCode);
      activateSection(sectionId);
    }
  );
}

// --------------------------------------------------------
// プレビュー
// --------------------------------------------------------
function isPreviewReady() {
  const order = appState.sectionOrder;
  if (!order || order.length === 0) return false;
  return order.some(id => {
    const s = appState.sections[id];
    return s && s.type === 'hero' && s.design;
  });
}

async function showPreview() {
  const html = await Generator.buildLP(appState);
  UI.renderPreview(html,
    () => renderBuilder(), // onBack
    () => downloadLP(html)  // onDownload
  );
  UI.show('screen-preview');
}

// --------------------------------------------------------
// ダウンロード
// --------------------------------------------------------
function downloadLP(html) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'lp.html';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

// --------------------------------------------------------
// 起動
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', init);
