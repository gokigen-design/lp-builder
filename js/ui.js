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

    // sectionConfig から type キーを逆引き
    const type = Object.keys(SECTIONS_CONFIG).find(k => SECTIONS_CONFIG[k] === sectionConfig) || '';

    Object.entries(sectionConfig.designs).forEach(([key, design]) => {
      const card = document.createElement('div');
      card.className = 'design-card' + (key === chosen ? ' selected' : '');
      card.dataset.design = key;
      const thumbKey = `${type}-${key}`;
      const thumbSvg = (typeof DESIGN_THUMBS !== 'undefined' && DESIGN_THUMBS[thumbKey])
        ? DESIGN_THUMBS[thumbKey]
        : `<span style="font-size:13px;color:#94a3b8;">${design.label}</span>`;
      card.innerHTML = `
        <div class="design-card-preview">${thumbSvg}</div>
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

  // ===== インライン編集（WYSIWYG） =====
  async renderInlineEditor(sectionId, sec, formConfig, onSave, onChangeDesign) {
    const content = document.getElementById('builder-content');
    const sectionConfig = SECTIONS_CONFIG[sec.type];
    const currentContent = sec.content || {};

    // テンプレートHTML取得
    const templatePath = `sections/${sec.type}/design-${sec.design}.html`;
    let rawHtml = '';
    try {
      const res = await fetch(templatePath);
      if (!res.ok) throw new Error('fetch failed');
      rawHtml = await res.text();
    } catch(e) {
      content.innerHTML = `<div class="empty-state"><p>テンプレートの読み込みに失敗しました</p></div>`;
      return;
    }

    const fieldMap = {};
    formConfig.fields.forEach(f => { fieldMap[f.key] = f; });

    // --- ITEM_TEMPLATE 展開 ---
    let html = rawHtml.replace(
      /<!--\s*ITEM_TEMPLATE\s*-->([\s\S]*?)<!--\s*\/ITEM_TEMPLATE\s*-->/g,
      (match, itemTpl) => {
        const itemsField = formConfig.fields.find(f => f.type === 'items');
        if (!itemsField) return '';
        const items = Array.isArray(currentContent.items) ? [...currentContent.items] : [];
        const min = itemsField.min || 1;
        while (items.length < min) items.push(itemsField.subfields ? {} : '');

        const rows = items.map((item, idx) => {
          let row = itemTpl;

          // Pass 1: Replace attribute tokens (except src) with plain text values
          row = row.replace(/(\w+)="([^"]*?)\{\{(\w+)\}\}([^"]*?)"/g, (m, attr, pre, key, post) => {
            if (attr === 'src') return m; // handled in pass 2
            const sf = itemsField.subfields?.find(s => s.key === key);
            const val = typeof item === 'string' ? (key === 'text' ? item : '') : (item[key] || '');
            const ph = sf?.placeholder || '';
            return `${attr}="${pre}${val || ph}${post}"`;
          });

          // Pass 2: Replace <img src="{{key}}"> with clickable div for image fields
          row = row.replace(/<img([^>]*)src=["']\{\{(\w+)\}\}["']([^>]*)>/g, (m, before, key, after) => {
            const sf = itemsField.subfields?.find(s => s.key === key);
            if (sf?.type === 'image') {
              const val = typeof item === 'string' ? '' : (item[key] || '');
              const imgHtml = val ? `<img src="${val}" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">` : '';
              return `<div class="lp-img-editable" data-item="${idx}" data-lp-field="${key}" data-lp-image="${key}" data-value="${val}" style="width:100%;height:100%;">
                ${imgHtml}
                <span class="lp-img-add-label" style="${val ? 'display:none' : ''}">画像を追加</span>
                <div class="lp-img-overlay"><span>${val ? '画像を変更' : '画像を追加'}</span></div>
              </div>`;
            }
            return m;
          });

          // Pass 3: Replace remaining text content {{key}} tokens with contenteditable spans
          row = row.replace(/\{\{(\w+)\}\}/g, (m, key) => {
            const sf = itemsField.subfields?.find(s => s.key === key);
            if (!sf) {
              // シンプルテキスト（mondai）
              const val = (typeof item === 'string' ? item : (item.text || ''));
              const ph = itemsField.placeholder || '';
              return `<span class="lp-editable" contenteditable="true" data-item="${idx}" data-lp-field="text" data-placeholder="${ph}">${val}</span>`;
            }
            if (sf.type === 'image') {
              // Fallback for image tokens not in src="" — create editable div
              const val = typeof item === 'string' ? '' : (item[key] || '');
              return `<div class="lp-img-editable" data-item="${idx}" data-lp-field="${key}" data-lp-image="${key}" data-value="${val}">
                ${val ? `<img src="${val}" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">` : ''}
                <span class="lp-img-add-label">画像を追加</span>
                <div class="lp-img-overlay"><span>${val ? '画像を変更' : '画像を追加'}</span></div>
              </div>`;
            }
            const val = item[key] || '';
            const ph = sf.placeholder || '';
            const isMulti = sf.type === 'textarea';
            const tag = isMulti ? 'div' : 'span';
            return `<${tag} class="lp-editable${isMulti ? ' lp-editable--block' : ''}" contenteditable="true" data-item="${idx}" data-lp-field="${key}" data-placeholder="${ph}">${val}</${tag}>`;
          });

          return `<div class="lp-item-wrap" data-item-idx="${idx}">${row}<button class="lp-remove-item" data-idx="${idx}" title="この項目を削除">×</button></div>`;
        }).join('');

        const maxCount = itemsField.max || 6;
        return `<div class="lp-items-container">${rows}<button class="lp-add-item" data-max="${maxCount}">＋ 追加</button></div>`;
      }
    );

    // --- style属性内の画像トークン (background-image: url('{{key}}')) ---
    html = html.replace(
      /(<[^>]*?)\sstyle="([^"]*?url\(['"]?)\{\{(\w+)\}\}(['"]?\)[^"]*?)"/g,
      (match, tag, styleA, key, styleB) => {
        const val = currentContent[key] || '';
        return `${tag} data-lp-image="${key}" style="${styleA}${val}${styleB}"`;
      }
    );

    // --- href属性内の URL トークン ---
    html = html.replace(/href=["']\{\{(\w+)\}\}["']/g, (match, key) => {
      const val = currentContent[key] || '#';
      return `href="${val}" data-lp-url="${key}"`;
    });

    // --- src属性内の画像トークン（imageフィールドは <img> 全体を編集可能divに差し替え）---
    html = html.replace(/<img([^>]*?)src=["']\{\{(\w+)\}\}["']([^>]*?)>/g, (match, before, key, after) => {
      const field = fieldMap[key];
      if (field?.type === 'image') {
        const val = currentContent[key] || '';
        const imgHtml = val
          ? `<img src="${val}" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">`
          : '';
        return `<div class="lp-img-editable" data-lp-image="${key}" data-value="${val}" style="width:100%;height:100%;">${imgHtml}<span class="lp-img-add-label"${val ? ' style="display:none"' : ''}>画像を追加</span><div class="lp-img-overlay"><span>${val ? '画像を変更' : '画像を追加'}</span></div></div>`;
      }
      // 画像フィールドでない src はそのまま置換
      const val = currentContent[key] || '';
      return `<img${before}src="${val}" data-lp-image="${key}"${after}>`;
    });

    // --- 残りのテキストトークン ---
    html = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const field = fieldMap[key];
      if (!field) return '';
      const val = currentContent[key] || '';
      const ph = field.placeholder || '';
      if (field.type === 'image') {
        // インラインで使われている画像フィールド（例: 背景画像がstyle以外）
        const style = val ? `background:url('${val}') center/cover no-repeat;` : 'background:#ddd;';
        return `<div class="lp-img-placeholder" data-lp-image="${key}" style="${style};min-height:120px;cursor:pointer;display:flex;align-items:center;justify-content:center;"><span class="lp-img-label">${val ? '画像を変更' : '画像を追加'}</span></div>`;
      }
      if (field.type === 'url') {
        const val2 = currentContent[key] || '';
        return `<span class="lp-editable lp-editable--url" contenteditable="true" data-lp-field="${key}" data-placeholder="${ph}">${val2}</span>`;
      }
      const isMulti = field.type === 'textarea';
      const tag = isMulti ? 'div' : 'span';
      return `<${tag} class="lp-editable${isMulti ? ' lp-editable--block' : ''}" contenteditable="true" data-lp-field="${key}" data-placeholder="${ph}">${val}</${tag}>`;
    });

    // URL フィールド（href以外）を下部フォームとして表示
    const urlFields = formConfig.fields.filter(f => f.type === 'url');
    const urlFormHtml = urlFields.length ? `
      <div class="inline-url-fields">
        ${urlFields.map(f => `
          <div class="inline-url-row">
            <label>${f.label}</label>
            <input type="url" class="lp-url-input" data-lp-field="${f.key}"
              value="${currentContent[f.key] || ''}" placeholder="${f.placeholder}">
          </div>
        `).join('')}
      </div>
    ` : '';

    content.innerHTML = `
      <div class="inline-editor">
        <div class="inline-editor-topbar">
          <div class="inline-editor-info">
            <span class="ie-section-name">${sectionConfig.label}</span>
            <span class="ie-design-name">— ${sectionConfig.designs[sec.design]?.label || ''}</span>
          </div>
          <button class="btn-change-design btn-secondary" id="ie-btn-change">デザインを変える</button>
        </div>
        <div class="inline-editor-hint">テキストをクリックして直接編集 / 画像エリアをクリックしてアップロード</div>
        <div class="inline-editor-canvas" id="ie-canvas">
          ${html}
        </div>
        ${urlFormHtml}
        <div class="inline-editor-footer">
          <button class="btn-save-section" id="ie-btn-save">保存して完了</button>
        </div>
      </div>
    `;

    const canvas = document.getElementById('ie-canvas');

    // プレースホルダー表示（空の時）
    canvas.querySelectorAll('[data-placeholder]').forEach(el => {
      if (!el.textContent.trim()) {
        el.setAttribute('data-empty', 'true');
      }
      el.addEventListener('focus', () => el.removeAttribute('data-empty'));
      el.addEventListener('blur', () => {
        if (!el.textContent.trim()) el.setAttribute('data-empty', 'true');
      });
    });

    // 画像フィールド（data-lp-image）のクリックハンドラ
    canvas.querySelectorAll('[data-lp-image]').forEach(el => {
      const key = el.dataset.lpImage;
      el.style.cursor = 'pointer';
      el.title = '画像を変更するにはクリック';
      // ホバーオーバーレイ追加
      if (!el.querySelector('.lp-img-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'lp-img-overlay';
        overlay.innerHTML = `<span>${currentContent[key] ? '画像を変更' : '画像を追加'}</span>`;
        // positionは既存CSSに任せる（上書きするとposition:absoluteのbg要素が崩れる）
        el.appendChild(overlay);
      }
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (ev) => {
          const file = ev.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (re) => {
            UI._resizeImageDataUrl(re.target.result, 1200, (dataUrl) => {
              el.dataset.value = dataUrl;
              // div.lp-img-editable の場合（アイテム内画像）
              if (el.classList.contains('lp-img-editable')) {
                let img = el.querySelector('img');
                if (!img) {
                  img = document.createElement('img');
                  img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
                  el.prepend(img);
                }
                img.src = dataUrl;
                const addLabel = el.querySelector('.lp-img-add-label');
                if (addLabel) addLabel.style.display = 'none';
              } else if (el.tagName === 'IMG') {
                el.src = dataUrl;
              } else if (el.style.backgroundImage !== undefined) {
                // background-imageの場合
                const oldStyle = el.getAttribute('style') || '';
                const newStyle = oldStyle.replace(/url\([^)]*\)/, `url('${dataUrl}')`);
                el.setAttribute('style', newStyle || `background-image:url('${dataUrl}')`);
              }
              const overlay = el.querySelector('.lp-img-overlay span');
              if (overlay) overlay.textContent = '画像を変更';
            });
          };
          reader.readAsDataURL(file);
        };
        input.click();
      });
    });

    // アイテム追加・削除
    canvas.querySelectorAll('.lp-add-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const container = btn.closest('.lp-items-container');
        const rows = container.querySelectorAll('.lp-item-wrap');
        const max = parseInt(btn.dataset.max) || 6;
        if (rows.length >= max) { btn.textContent = `最大${max}個まで`; return; }
        const lastRow = rows[rows.length - 1];
        if (!lastRow) return;
        const newRow = lastRow.cloneNode(true);
        const newIdx = rows.length;
        newRow.dataset.itemIdx = newIdx;
        newRow.querySelectorAll('[data-item]').forEach(el => {
          el.dataset.item = newIdx;
          el.textContent = '';
          el.removeAttribute('data-empty');
          el.removeAttribute('src');
        });
        newRow.querySelectorAll('[data-lp-image]').forEach(img => {
          img.dataset.value = '';
          if (img.tagName === 'IMG') img.src = '';
        });
        const removeBtn = newRow.querySelector('.lp-remove-item');
        if (removeBtn) {
          removeBtn.dataset.idx = newIdx;
          removeBtn.addEventListener('click', () => {
            newRow.remove();
            UI._reindexItems(container);
          });
        }
        container.insertBefore(newRow, btn);
        UI._reindexItems(container);
      });
    });

    canvas.querySelectorAll('.lp-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.lp-item-wrap');
        const container = row?.closest('.lp-items-container');
        row?.remove();
        if (container) UI._reindexItems(container);
      });
    });

    // 画像チップ（items内の画像フィールド）
    canvas.querySelectorAll('.lp-img-chip').forEach(chip => {
      chip.style.cursor = 'pointer';
      chip.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (ev) => {
          const file = ev.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (re) => {
            UI._resizeImageDataUrl(re.target.result, 1200, (dataUrl) => {
              chip.dataset.value = dataUrl;
              chip.innerHTML = `<img src="${dataUrl}" style="width:48px;height:48px;object-fit:cover;border-radius:4px;">`;
            });
          };
          reader.readAsDataURL(file);
        };
        input.click();
      });
    });

    // 保存
    document.getElementById('ie-btn-save').addEventListener('click', () => {
      const data = UI._collectInlineData(canvas, formConfig);
      // URL フィールドをフォームから収集
      content.querySelectorAll('.lp-url-input').forEach(input => {
        data[input.dataset.lpField] = input.value.trim();
      });
      // href経由のURLも収集
      canvas.querySelectorAll('[data-lp-url]').forEach(el => {
        const key = el.dataset.lpUrl;
        // URLフォームがあればそちらを優先
        if (data[key] === undefined) data[key] = el.getAttribute('href') || '';
      });
      onSave(data);
    });

    document.getElementById('ie-btn-change').addEventListener('click', onChangeDesign);
  },

  _reindexItems(container) {
    container.querySelectorAll('.lp-item-wrap').forEach((row, i) => {
      row.dataset.itemIdx = i;
      row.querySelectorAll('[data-item]').forEach(el => el.dataset.item = i);
    });
  },

  _resizeImageDataUrl(dataUrl, maxWidth, callback) {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.floor(img.width * scale);
      const h = Math.floor(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = dataUrl;
  },

  _collectInlineData(canvas, formConfig) {
    const data = {};
    formConfig.fields.forEach(field => {
      if (field.type === 'items') {
        const rows = canvas.querySelectorAll('.lp-item-wrap');
        if (field.subfields) {
          data.items = Array.from(rows).map(row => {
            const item = {};
            field.subfields.forEach(sf => {
              if (sf.type === 'image') {
                const el = row.querySelector(`[data-lp-field="${sf.key}"][data-lp-image]`);
                item[sf.key] = el?.dataset.value || '';
              } else {
                const el = row.querySelector(`[contenteditable][data-lp-field="${sf.key}"]`);
                item[sf.key] = el?.textContent?.trim() || '';
              }
            });
            return item;
          }).filter(item => Object.values(item).some(v => v));
        } else {
          // シンプルテキストリスト（mondai）
          data.items = Array.from(rows).map(row => {
            const el = row.querySelector(`[contenteditable][data-lp-field="text"]`);
            return el?.textContent?.trim() || '';
          }).filter(Boolean);
        }
      } else if (field.type === 'image') {
        const el = canvas.querySelector(`[data-lp-image="${field.key}"]`);
        data[field.key] = el?.dataset.value || '';
      } else if (field.type === 'url') {
        // URL はフォームから取得するのでここでは skip (callerが処理)
      } else {
        const el = canvas.querySelector(`[contenteditable][data-lp-field="${field.key}"]`);
        data[field.key] = el?.textContent?.trim() || '';
      }
    });
    return data;
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
