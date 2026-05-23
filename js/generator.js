// js/generator.js
const Generator = {

  // --------------------------------------------------------
  // メイン：LP全体のHTMLを生成して返す
  // --------------------------------------------------------
  async buildLP(state) {
    const { globalSettings, sections, sectionOrder } = state;
    const { colorTheme, font } = globalSettings;

    // 各セクションのHTMLを順に取得
    const sectionsHtml = [];
    for (const id of sectionOrder) {
      const sec = sections[id];
      if (!sec || !sec.design) continue;
      const html = await Generator.renderSection(sec);
      if (html) sectionsHtml.push(html);
    }

    // CSSカスタムプロパティ（テーマ色・フォント）
    const themeVars = Generator._buildThemeVars(colorTheme, font);

    return Generator._wrapPage(sectionsHtml.join('\n'), themeVars, font);
  },

  // --------------------------------------------------------
  // 1セクションのHTMLを生成
  // --------------------------------------------------------
  async renderSection(sec) {
    const templatePath = `sections/${sec.type}/design-${sec.design}.html`;
    let template;
    try {
      const res = await fetch(templatePath);
      if (!res.ok) return '';
      template = await res.text();
    } catch (e) {
      console.warn('template fetch failed:', templatePath, e);
      return '';
    }

    const content = sec.content || {};
    return Generator._fillTemplate(template, sec.type, content);
  },

  // --------------------------------------------------------
  // テンプレートにデータを流し込む
  // --------------------------------------------------------
  _fillTemplate(template, type, content) {
    let html = template;

    // 1) 繰り返しブロック（items）の展開
    html = Generator._expandItems(html, content);

    // 2) スカラートークンの置換
    html = Generator._replaceTokens(html, content);

    return html;
  },

  // --------------------------------------------------------
  // <!-- ITEM_TEMPLATE --> ... <!-- /ITEM_TEMPLATE --> を展開
  // --------------------------------------------------------
  _expandItems(template, content) {
    return template.replace(
      /<!--\s*ITEM_TEMPLATE\s*-->([\s\S]*?)<!--\s*\/ITEM_TEMPLATE\s*-->/g,
      (match, itemTpl) => {
        const items = content.items;
        if (!Array.isArray(items) || items.length === 0) return '';
        return items.map(item => Generator._replaceTokens(itemTpl, item)).join('\n');
      }
    );
  },

  // --------------------------------------------------------
  // {{key}} を対応する値に置換
  // --------------------------------------------------------
  _replaceTokens(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const val = data[key];
      if (val === undefined || val === null || val === '') return '';
      return Generator._escapeHtml(String(val));
    });
  },

  // --------------------------------------------------------
  // HTMLエスケープ（ただし画像は data: URI のまま通す）
  // --------------------------------------------------------
  _escapeHtml(str) {
    if (str.startsWith('data:image')) return str; // base64画像はそのまま
    if (str.startsWith('http://') || str.startsWith('https://')) return str; // URL
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  // --------------------------------------------------------
  // テーマ CSS カスタムプロパティ文字列を生成
  // colorTheme は { main, sub, accent } の形（ui.js の COLOR_PRESETS と同じ）
  // --------------------------------------------------------
  _buildThemeVars(colorTheme, font) {
    const ct = colorTheme || {};
    const main   = ct.main   || '#6366f1';
    const sub    = ct.sub    || '#a5b4fc';
    const accent = ct.accent || '#f59e0b';

    return `
      --lp-color-main:   ${main};
      --lp-color-accent: ${sub};
      --lp-color-sub:    ${sub};
      --lp-color-highlight: ${accent};
      --lp-color-bg:     #ffffff;
      --lp-color-text:   #1a1a2e;
    `.trim();
  },

  // --------------------------------------------------------
  // font キー ('noto-sans' etc.) → CSS フォントファミリー文字列
  // --------------------------------------------------------
  _fontToCss(fontKey) {
    const map = {
      'noto-sans':  "'Noto Sans JP', sans-serif",
      'zen-maru':   "'Zen Maru Gothic', sans-serif",
      'noto-serif': "'Noto Serif JP', serif",
    };
    return map[fontKey] || "'Noto Sans JP', sans-serif";
  },

  // --------------------------------------------------------
  // 完全なHTMLページとしてラップ
  // --------------------------------------------------------
  _wrapPage(sectionsHtml, themeVars, font) {
    const fontFamily = Generator._fontToCss(font);
    const googleFont = Generator._googleFontLink(font);

    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LP</title>
  ${googleFont}
  <style>
    :root {
      ${themeVars}
      --lp-font: ${fontFamily};
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--lp-font);
      background-color: var(--lp-color-bg);
      color: var(--lp-color-text);
      font-size: 16px;
      line-height: 1.8;
      overflow-x: hidden;
    }
    img { max-width: 100%; height: auto; display: block; }
    a { color: inherit; text-decoration: none; }
    .lp-btn {
      display: inline-block;
      background: var(--lp-color-main);
      color: #fff;
      padding: 16px 48px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      transition: opacity 0.2s;
      cursor: pointer;
    }
    .lp-btn:hover { opacity: 0.85; }
    @media (max-width: 768px) {
      .lp-btn { padding: 14px 32px; font-size: 16px; }
    }
  </style>
</head>
<body>
${sectionsHtml}
</body>
</html>`;
  },

  // --------------------------------------------------------
  // Google Fonts <link> タグ（fontKey ベース）
  // --------------------------------------------------------
  _googleFontLink(fontKey) {
    const fontMap = {
      'noto-sans':  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
      'zen-maru':   'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap',
      'noto-serif': 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap',
    };
    const href = fontMap[fontKey] || fontMap['noto-sans'];
    return `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${href}" rel="stylesheet">`;
  },
};
