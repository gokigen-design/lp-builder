// js/ui.js
const UI = {

  // ===== ユーティリティ =====
  show(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('active');
      s.classList.add('hidden');
    });
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    target.classList.add('active');
  },

  // ===== 認証画面 =====
  renderAuth(onSuccess) {
    const el = document.getElementById('screen-auth');
    el.innerHTML = `
      <div class="auth-box">
        <h1>LP ビルダー</h1>
        <p class="auth-sub">ワークショップ参加者専用ツール<br>受け取った参加者コードを入力してください</p>
        <input type="text" id="code-input" placeholder="参加者コードを入力" autocomplete="off">
        <button class="btn-primary" id="btn-login">ログイン</button>
        <div class="auth-error hidden" id="auth-error">コードが正しくありません</div>
      </div>
    `;

    const input = document.getElementById('code-input');
    const btn = document.getElementById('btn-login');
    const errMsg = document.getElementById('auth-error');

    const tryLogin = async () => {
      const code = input.value.trim();
      if (!code) return;
      btn.textContent = '確認中...';
      btn.disabled = true;
      const ok = await Auth.validate(code);
      if (ok) {
        onSuccess(code);
      } else {
        errMsg.classList.remove('hidden');
        btn.textContent = 'ログイン';
        btn.disabled = false;
        input.value = '';
        input.focus();
      }
    };

    btn.addEventListener('click', tryLogin);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  },

  // ===== グローバル設定画面 =====
  COLOR_PRESETS: [
    { name: 'インディゴ', main: '#6366f1', sub: '#a5b4fc', accent: '#f59e0b' },
    { name: 'ローズ',     main: '#e11d48', sub: '#fda4af', accent: '#f59e0b' },
    { name: 'グリーン',   main: '#16a34a', sub: '#86efac', accent: '#f59e0b' },
    { name: 'オレンジ',   main: '#ea580c', sub: '#fdba74', accent: '#6366f1' },
    { name: 'ティール',   main: '#0d9488', sub: '#5eead4', accent: '#f59e0b' },
    { name: 'パープル',   main: '#9333ea', sub: '#d8b4fe', accent: '#f59e0b' },
    { name: 'ピンク',     main: '#db2777', sub: '#f9a8d4', accent: '#6366f1' },
    { name: 'ネイビー',   main: '#1e3a8a', sub: '#93c5fd', accent: '#f59e0b' },
  ],

  FONT_OPTIONS: [
    { value: 'noto-sans',  label: 'Noto Sans JP',  preview: 'あいう ABC', css: "'Noto Sans JP', sans-serif" },
    { value: 'zen-maru',   label: '丸ゴシック',    preview: 'あいう ABC', css: "'Zen Maru Gothic', sans-serif" },
    { value: 'noto-serif', label: 'Noto Serif JP', preview: 'あいう ABC', css: "'Noto Serif JP', serif" },
  ],

  renderSettings(currentSettings, onSave) {
    const el = document.getElementById('screen-settings');
    let selectedColor = currentSettings.colorTheme;
    let selectedFont = currentSettings.font;

    el.innerHTML = `
      <div class="settings-box">
        <h2>ブランドカラーとフォントを選んでください</h2>
        <p class="subtitle">全セクションに自動で反映されます。あとから変更もできます。</p>
        <div class="settings-section">
          <label>ブランドカラー</label>
          <div class="color-presets" id="color-presets"></div>
        </div>
        <div class="settings-section">
          <label>フォント</label>
          <div class="font-options" id="font-options"></div>
        </div>
        <button class="btn-primary" id="btn-start">LP を作り始める</button>
      </div>
    `;

    // カラープリセット
    const presetsEl = document.getElementById('color-presets');
    UI.COLOR_PRESETS.forEach(preset => {
      const btn = document.createElement('div');
      btn.className = 'color-preset' + (preset.main === selectedColor.main ? ' selected' : '');
      btn.style.background = `linear-gradient(135deg, ${preset.main}, ${preset.sub})`;
      btn.title = preset.name;
      btn.addEventListener('click', () => {
        presetsEl.querySelectorAll('.color-preset').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedColor = { main: preset.main, sub: preset.sub, accent: preset.accent };
      });
      presetsEl.appendChild(btn);
    });

    // フォントオプション
    const fontsEl = document.getElementById('font-options');
    UI.FONT_OPTIONS.forEach(opt => {
      const div = document.createElement('div');
      div.className = 'font-option' + (opt.value === selectedFont ? ' selected' : '');
      div.innerHTML = `
        <div class="font-preview" style="font-family:${opt.css}">${opt.preview}</div>
        <div class="font-name">${opt.label}</div>
      `;
      div.addEventListener('click', () => {
        fontsEl.querySelectorAll('.font-option').forEach(d => d.classList.remove('selected'));
        div.classList.add('selected');
        selectedFont = opt.value;
      });
      fontsEl.appendChild(div);
    });

    document.getElementById('btn-start').addEventListener('click', () => {
      onSave({ colorTheme: selectedColor, font: selectedFont });
    });
  },

  // ===== ビルダーメイン画面 =====
  renderBuilderShell(state, handlers) {
    const { onSectionClick, onAddSection, onDeleteSection, onPreview, onSettings } = handlers;
    const el = document.getElementById('screen-builder');

    // handlers.enablePreview が明示的に渡されていればそちらを使用
    const allDone = (handlers.enablePreview !== undefined)
      ? handlers.enablePreview
      : (state.sectionOrder.length > 0 &&
         state.sectionOrder.every(id => state.sections[id]?.status === 'done'));

    el.innerHTML = `
      <aside class="builder-sidebar">
        <div class="sidebar-header">
          <h2>LP 構成</h2>
          <p>クリックして編集・ドラッグで並び替え</p>
        </div>
        <div class="sidebar-sections" id="section-list"></div>
        <div class="sidebar-add">
          <button class="btn-add-section" id="btn-add-section">＋ セクションを追加</button>
          <div class="section-type-picker hidden" id="section-type-picker"></div>
        </div>
      </aside>
      <div class="builder-main">
        <div class="builder-topbar">
          <h3 id="topbar-title">セクションを選んでください</h3>
          <div class="topbar-actions">
            <button class="btn-secondary" id="btn-settings">設定変更</button>
            <button class="btn-preview ${allDone ? 'enabled' : ''}" id="btn-preview">
              プレビュー &amp; ダウンロード
            </button>
          </div>
        </div>
        <div class="builder-content" id="builder-content">
          <div class="empty-state">
            <h3>左のサイドバーからセクションを追加してください</h3>
            <p style="color:#64748b;font-size:13px;margin-top:8px;">ヒーロー・お悩み・ステップ・お客様の声・CTAを組み合わせてLPを作ります</p>
          </div>
        </div>
      </div>
    `;

    UI.renderSidebarSections(state, onSectionClick, onDeleteSection);

    // セクション追加ボタン
    const addBtn = document.getElementById('btn-add-section');
    const picker = document.getElementById('section-type-picker');
    let pickerBuilt = false;

    addBtn.addEventListener('click', () => {
      picker.classList.toggle('hidden');
      if (!pickerBuilt) {
        picker.innerHTML = SECTION_TYPES_ORDER.map(type =>
          `<div class="section-type-option" data-type="${type}">
            ${SECTIONS_CONFIG[type].icon} ${SECTIONS_CONFIG[type].label}
          </div>`
        ).join('');
        picker.querySelectorAll('.section-type-option').forEach(opt => {
          opt.addEventListener('click', () => {
            onAddSection(opt.dataset.type);
            picker.classList.add('hidden');
          });
        });
        pickerBuilt = true;
      }
    });

    // ピッカー外クリックで閉じる
    document.addEventListener('click', function closePicker(e) {
      if (!addBtn.contains(e.target) && !picker.contains(e.target)) {
        picker.classList.add('hidden');
        document.removeEventListener('click', closePicker);
      }
    });

    document.getElementById('btn-preview').addEventListener('click', () => {
      if (allDone) onPreview();
    });

    document.getElementById('btn-settings').addEventListener('click', onSettings);
  },

  renderSidebarSections(state, onSectionClick, onDeleteSection) {
    const list = document.getElementById('section-list');
    if (!list) return;

    if (state.sectionOrder.length === 0) {
      list.innerHTML = '<div style="color:#64748b;font-size:12px;padding:8px 12px;">まだセクションがありません</div>';
      return;
    }

    list.innerHTML = state.sectionOrder.map(id => {
      const sec = state.sections[id];
      if (!sec) return '';
      const config = SECTIONS_CONFIG[sec.type];
      const statusIcon = sec.status === 'done' ? '✓' : sec.status === 'editing' ? '▶' : '○';
      const designLabel = sec.design ? (config.designs[sec.design]?.label || '') : '';
      return `
        <div class="section-item ${sec.status === 'done' ? 'done' : ''}" data-id="${id}">
          <span class="drag-handle">⠿</span>
          <span class="section-status">${statusIcon}</span>
          <div class="section-item-info">
            <div class="section-label">${config.label}</div>
            ${designLabel ? `<div class="section-design">${designLabel}</div>` : ''}
          </div>
          <button class="section-delete" data-id="${id}" title="削除">×</button>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.section-item').forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.classList.contains('section-delete')) return;
        list.querySelectorAll('.section-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        onSectionClick(item.dataset.id);
      });
    });

    list.querySelectorAll('.section-delete').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (confirm('このセクションを削除しますか？')) {
          onDeleteSection(btn.dataset.id);
        }
      });
    });
  },

  // ===== デザイン選択画面 =====
  renderDesignPicker(sectionId, sectionConfig, selectedDesign, onSelect) {
    const content = document.getElementById('builder-content');
    content.innerHTML = `
      <div class="design-picker">
        <h3>${sectionConfig.label} — デザインを選ぶ</h3>
        <p class="subtitle">好みのデザインを選んでください。次のステップでテキスト・画像を入れます。</p>
        <div class="design-cards" id="design-cards"></div>
        <button class="btn-decide ${selectedDesign ? 'enabled' : ''}" id="btn-decide">
          このデザインで決定 &rarr; テキストを入力
        </button>
      </div>
    `;

    let chosen = selectedDesign;
    const decideBtn = document.getElementById('btn-decide');

    Object.entries(sectionConfig.designs).forEach(([key, design]) => {
      const card = document.createElement('div');
      card.className = 'design-card' + (key === chosen ? ' selected' : '');
      card.dataset.design = key;
      card.innerHTML = `
        <div class="design-card-preview">${design.label}</div>
        <div class="design-card-info">
          <h4>${design.label}</h4>
          <p>${design.description}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('.design-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        chosen = key;
        decideBtn.classList.add('enabled');
      });
      document.getElementById('design-cards').appendChild(card);
    });

    decideBtn.addEventListener('click', () => {
      if (chosen) onSelect(chosen);
    });
  },

  // ===== コンテンツ入力フォーム =====
  renderContentForm(sectionId, sec, formConfig, onSave, onChangeDesign) {
    const content = document.getElementById('builder-content');
    const sectionConfig = SECTIONS_CONFIG[sec.type];

    content.innerHTML = `
      <div class="content-form">
        <h3>${sectionConfig.label} — テキスト・画像を入力</h3>
        <p class="subtitle">デザイン: ${sectionConfig.designs[sec.design]?.label || ''}</p>
        <div id="form-fields"></div>
        <div class="form-actions">
          <button class="btn-save-section" id="btn-save-section">保存して完了</button>
          <button class="btn-change-design" id="btn-change-design">デザインを変える</button>
        </div>
      </div>
    `;

    const fieldsEl = document.getElementById('form-fields');
    const currentContent = sec.content || {};

    formConfig.fields.forEach(field => {
      const group = document.createElement('div');
      group.className = 'field-group';
      group.innerHTML = `<label>${field.label}</label>`;

      if (field.type === 'image') {
        const area = UI._buildImageUploadArea(field.key, currentContent[field.key] || '');
        group.appendChild(area);
      } else if (field.type === 'items') {
        const itemsEl = UI._buildItemsField(field, currentContent[field.key] || []);
        group.appendChild(itemsEl);
      } else {
        const input = field.type === 'textarea'
          ? Object.assign(document.createElement('textarea'), { name: field.key, placeholder: field.placeholder, value: currentContent[field.key] || '' })
          : Object.assign(document.createElement('input'), { type: field.type, name: field.key, placeholder: field.placeholder, value: currentContent[field.key] || '' });
        group.appendChild(input);
      }

      fieldsEl.appendChild(group);
    });

    document.getElementById('btn-save-section').addEventListener('click', () => {
      const collected = UI._collectFormData(formConfig, fieldsEl);
      onSave(collected);
    });

    document.getElementById('btn-change-design').addEventListener('click', onChangeDesign);
  },

  _buildImageUploadArea(fieldKey, currentValue) {
    const area = document.createElement('div');
    area.className = 'image-upload-area' + (currentValue ? ' has-image' : '');
    area.dataset.fieldKey = fieldKey;
    area.dataset.value = currentValue;

    if (currentValue) {
      const img = document.createElement('img');
      img.src = currentValue;
      area.appendChild(img);
    } else {
      area.innerHTML = '<p>クリックして画像を選択</p>';
    }

    area.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        // リサイズしてbase64に変換（localStorage節約）
        const reader = new FileReader();
        reader.onload = ev => {
          UI._resizeImage(ev.target.result, 1200, result => {
            area.innerHTML = '';
            const img = document.createElement('img');
            img.src = result;
            area.appendChild(img);
            area.classList.add('has-image');
            area.dataset.value = result;
          });
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    });

    return area;
  },

  _resizeImage(dataUrl, maxWidth, callback) {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = dataUrl;
  },

  _buildItemsField(field, currentItems) {
    const wrapper = document.createElement('div');

    const list = document.createElement('div');
    list.className = 'items-list';
    list.id = `items-${field.key}`;

    // 最低 min 件表示
    const displayItems = [...currentItems];
    while (displayItems.length < (field.min || 1)) displayItems.push(field.subfields ? {} : '');

    displayItems.forEach(item => {
      list.appendChild(UI._buildItemRow(field, item));
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add-item';
    addBtn.textContent = '＋ 追加';
    addBtn.addEventListener('click', () => {
      const currentCount = list.querySelectorAll('.item-row').length;
      if (currentCount >= (field.max || 6)) return;
      list.appendChild(UI._buildItemRow(field, field.subfields ? {} : ''));
    });

    wrapper.appendChild(list);
    wrapper.appendChild(addBtn);
    return wrapper;
  },

  _buildItemRow(field, item) {
    const row = document.createElement('div');
    row.className = 'item-row';

    const fields = document.createElement('div');
    fields.className = 'item-fields';

    if (field.subfields) {
      field.subfields.forEach(sub => {
        if (sub.type === 'image') {
          const area = document.createElement('div');
          area.className = 'item-image-area' + (item[sub.key] ? ' has-image' : '');
          area.dataset.key = sub.key;
          area.dataset.value = item[sub.key] || '';
          area.innerHTML = item[sub.key] ? `<img src="${item[sub.key]}">` : sub.label;
          area.addEventListener('click', () => {
            const fi = document.createElement('input');
            fi.type = 'file'; fi.accept = 'image/*';
            fi.onchange = e => {
              const file = e.target.files[0]; if (!file) return;
              const reader = new FileReader();
              reader.onload = ev => {
                UI._resizeImage(ev.target.result, 800, result => {
                  area.innerHTML = `<img src="${result}">`;
                  area.classList.add('has-image');
                  area.dataset.value = result;
                });
              };
              reader.readAsDataURL(file);
            };
            fi.click();
          });
          fields.appendChild(area);
        } else if (sub.type === 'textarea') {
          const ta = document.createElement('textarea');
          ta.placeholder = sub.label;
          ta.dataset.key = sub.key;
          ta.value = item[sub.key] || '';
          fields.appendChild(ta);
        } else {
          const inp = document.createElement('input');
          inp.type = 'text';
          inp.placeholder = sub.label;
          inp.dataset.key = sub.key;
          inp.value = item[sub.key] || '';
          fields.appendChild(inp);
        }
      });
    } else {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.placeholder = field.placeholder || '';
      inp.value = typeof item === 'string' ? item : '';
      fields.appendChild(inp);
    }

    const removeBtn = document.createElement('button');
    removeBtn.className = 'item-remove';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => row.remove());

    row.appendChild(fields);
    row.appendChild(removeBtn);
    return row;
  },

  _collectFormData(formConfig, container) {
    const data = {};
    formConfig.fields.forEach(field => {
      if (field.type === 'image') {
        const area = container.querySelector(`.image-upload-area[data-field-key="${field.key}"]`);
        data[field.key] = area ? area.dataset.value : '';
      } else if (field.type === 'items') {
        const list = container.querySelector(`#items-${field.key}`);
        if (!list) { data[field.key] = []; return; }
        const rows = list.querySelectorAll('.item-row');
        if (field.subfields) {
          data[field.key] = Array.from(rows).map(row => {
            const obj = {};
            row.querySelectorAll('[data-key]').forEach(el => {
              obj[el.dataset.key] = el.dataset.value !== undefined ? el.dataset.value : el.value || '';
            });
            return obj;
          }).filter(obj => Object.values(obj).some(v => v));
        } else {
          data[field.key] = Array.from(rows)
            .map(row => row.querySelector('input, textarea')?.value?.trim() || '')
            .filter(v => v);
        }
      } else {
        const el = container.querySelector(`[name="${field.key}"]`);
        data[field.key] = el ? el.value.trim() : '';
      }
    });
    return data;
  },

  // ===== プレビュー画面 =====
  renderPreview(html, onBack, onDownload) {
    const el = document.getElementById('screen-preview');
    el.innerHTML = `
      <div class="preview-bar">
        <div class="preview-toggle">
          <button class="active" id="btn-pc">PC</button>
          <button id="btn-sp">スマホ</button>
        </div>
        <button class="btn-download" id="btn-download">HTML をダウンロード</button>
        <button class="btn-secondary btn-back" id="btn-back">← 編集に戻る</button>
      </div>
      <div class="preview-frame-wrapper" id="preview-wrapper">
        <iframe id="preview-iframe" sandbox="allow-same-origin allow-scripts"></iframe>
      </div>
    `;

    const iframe = document.getElementById('preview-iframe');
    const wrapper = document.getElementById('preview-wrapper');
    iframe.srcdoc = html;

    document.getElementById('btn-pc').addEventListener('click', () => {
      wrapper.classList.remove('mobile');
      document.getElementById('btn-pc').classList.add('active');
      document.getElementById('btn-sp').classList.remove('active');
    });
    document.getElementById('btn-sp').addEventListener('click', () => {
      wrapper.classList.add('mobile');
      document.getElementById('btn-sp').classList.add('active');
      document.getElementById('btn-pc').classList.remove('active');
    });
    document.getElementById('btn-download').addEventListener('click', onDownload);
    document.getElementById('btn-back').addEventListener('click', onBack);
  },
};
