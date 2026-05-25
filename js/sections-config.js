// js/sections-config.js
const SECTIONS_CONFIG = {
  midashi: {
    label: '見出し',
    icon: 'H',
    designs: {
      a: { label: '中央線', description: '左右に線が伸びるシンプルな見出し' },
      b: { label: '矢印', description: '色帯＋下向き矢印のアクセント' },
    }
  },
  hero: {
    label: 'ヒーロー（FV）',
    icon: '★',
    designs: {
      a: { label: 'フルスクリーン画像', description: '背景に写真・パララックスあり' },
      b: { label: 'グラデーション', description: '写真なしでもOK・洗練された背景' },
    }
  },
  mondai: {
    label: 'お悩みセクション',
    icon: '？',
    designs: {
      a: { label: 'リスト型', description: '赤ライン＋箇条書き・シンプル' },
      c: { label: '人物囲み型', description: '中央に人物写真・左右に悩みカード' },
    }
  },
  step: {
    label: 'ステップ',
    icon: '①',
    designs: {
      a: { label: '横並び＋画像カード型', description: 'STEPバッジ＋写真＋矢印' },
      c: { label: '縦フロー型', description: 'Step.1 | タイトル＋説明・縦並び' },
    }
  },
  voice: {
    label: 'お客様の声',
    icon: '"',
    designs: {
      a: { label: '顔写真＋コメント', description: '写真丸抜き・名前・コメント' },
      b: { label: 'スクショ風', description: 'LINEのスクショっぽいデザイン' },
    }
  },
  cta: {
    label: 'お申し込み CTA',
    icon: '!',
    designs: {
      a: { label: 'シンプル CTA', description: '大きなボタン＋キャッチコピー' },
      b: { label: '特典付き CTA', description: '「今だけ特典」ボックス付き' },
    }
  },
  content: {
    label: 'テキスト＋画像',
    icon: '画',
    designs: {
      a: { label: '右画像', description: 'テキスト左・画像右・白背景' },
      b: { label: '左画像', description: '画像左・テキスト右・白背景' },
      c: { label: '右画像＋背景（明）', description: '背景画像あり・明るいトーン' },
      d: { label: '右画像＋背景（暗）', description: '背景画像あり・暗いトーン' },
    }
  },
  card: {
    label: 'カード',
    icon: '三',
    designs: {
      a: { label: '上画像3列', description: '画像上・タイトル・テキスト・ボタン' },
      b: { label: '上画像2列', description: '2カラム・スマホ横並び' },
    }
  },
  faq: {
    label: 'よくある質問',
    icon: 'Q',
    designs: {
      a: { label: 'Q&Aリスト', description: 'Q（青）A（薄色）交互リスト' },
    }
  },
};

// サイドバーに表示する順番（追加可能セクションの一覧）
const SECTION_TYPES_ORDER = ['hero', 'midashi', 'content', 'card', 'mondai', 'step', 'voice', 'faq', 'cta'];

// デザインピッカー用サムネイルSVG（レイアウトスケッチ）
const DESIGN_THUMBS = {

  'midashi-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <line x1="16" y1="65" x2="74" y2="65" stroke="#a5b4fc" stroke-width="2"/>
    <rect x="82" y="55" width="76" height="22" rx="11" fill="#1e1e3f" opacity="0.85"/>
    <rect x="90" y="62" width="60" height="8" rx="4" fill="#fff" opacity="0.9"/>
    <line x1="166" y1="65" x2="224" y2="65" stroke="#a5b4fc" stroke-width="2"/>
    <rect x="70" y="88" width="100" height="8" rx="4" fill="#e5e7eb"/>
  </svg>`,

  'midashi-b': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <rect x="0" y="20" width="240" height="54" fill="#6366f1"/>
    <rect x="56" y="36" width="128" height="16" rx="8" fill="#fff" opacity="0.92"/>
    <polygon points="102,74 138,74 120,94" fill="#6366f1"/>
    <rect x="70" y="102" width="100" height="8" rx="4" fill="#e5e7eb"/>
  </svg>`,

  'hero-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="ha-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#374151"/><stop offset="100%" stop-color="#111827"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#ha-g)"/>
    <rect x="40" y="14" width="160" height="8" rx="4" fill="#fff" opacity="0.35"/>
    <rect x="65" y="30" width="110" height="15" rx="7" fill="#fff" opacity="0.92"/>
    <rect x="85" y="52" width="70" height="9" rx="4" fill="#fff" opacity="0.55"/>
    <rect x="90" y="65" width="60" height="9" rx="4" fill="#fff" opacity="0.55"/>
    <rect x="75" y="88" width="90" height="26" rx="13" fill="#f59e0b"/>
    <rect x="92" y="95" width="56" height="12" rx="6" fill="#fff" opacity="0.9"/>
  </svg>`,

  'hero-b': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="hb-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#hb-g)"/>
    <circle cx="184" cy="68" r="44" fill="#fff" opacity="0.07"/>
    <circle cx="184" cy="68" r="28" fill="#fff" opacity="0.07"/>
    <rect x="18" y="24" width="110" height="15" rx="7" fill="#fff" opacity="0.95"/>
    <rect x="18" y="47" width="88" height="9" rx="4" fill="#fff" opacity="0.65"/>
    <rect x="18" y="60" width="76" height="9" rx="4" fill="#fff" opacity="0.65"/>
    <rect x="18" y="82" width="92" height="26" rx="13" fill="#f59e0b"/>
    <rect x="32" y="89" width="64" height="12" rx="6" fill="#fff" opacity="0.9"/>
  </svg>`,

  'mondai-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <rect x="70" y="12" width="100" height="14" rx="7" fill="#e5e7eb"/>
    <rect x="96" y="30" width="48" height="8" rx="4" fill="#e5e7eb"/>
    <circle cx="26" cy="62" r="7" fill="#ef4444"/>
    <rect x="40" y="57" width="178" height="10" rx="5" fill="#fee2e2"/>
    <circle cx="26" cy="88" r="7" fill="#ef4444"/>
    <rect x="40" y="83" width="158" height="10" rx="5" fill="#fee2e2"/>
    <circle cx="26" cy="114" r="7" fill="#ef4444"/>
    <rect x="40" y="109" width="168" height="10" rx="5" fill="#fee2e2"/>
  </svg>`,

  'mondai-c': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#f8f7ff"/>
    <rect x="70" y="8" width="100" height="12" rx="6" fill="#ddd6fe"/>
    <rect x="6" y="40" width="70" height="88" rx="6" fill="#fff" stroke="#ddd6fe" stroke-width="1.5"/>
    <rect x="14" y="52" width="54" height="8" rx="4" fill="#ddd6fe"/>
    <rect x="14" y="65" width="46" height="8" rx="4" fill="#ede9fe"/>
    <rect x="14" y="78" width="52" height="8" rx="4" fill="#ede9fe"/>
    <rect x="14" y="91" width="42" height="8" rx="4" fill="#ede9fe"/>
    <ellipse cx="120" cy="98" rx="32" ry="38" fill="#ede9fe"/>
    <ellipse cx="120" cy="58" rx="22" ry="22" fill="#c4b5fd"/>
    <rect x="164" y="40" width="70" height="88" rx="6" fill="#fff" stroke="#ddd6fe" stroke-width="1.5"/>
    <rect x="172" y="52" width="54" height="8" rx="4" fill="#ddd6fe"/>
    <rect x="172" y="65" width="46" height="8" rx="4" fill="#ede9fe"/>
    <rect x="172" y="78" width="52" height="8" rx="4" fill="#ede9fe"/>
    <rect x="172" y="91" width="42" height="8" rx="4" fill="#ede9fe"/>
  </svg>`,

  'step-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <rect x="80" y="6" width="80" height="12" rx="6" fill="#e5e7eb"/>
    <rect x="8" y="26" width="64" height="92" rx="7" fill="#f8f9ff" stroke="#e0e7ff" stroke-width="1.5"/>
    <rect x="8" y="26" width="64" height="38" rx="7" fill="#e0e7ff"/>
    <rect x="8" y="52" width="64" height="12" fill="#e0e7ff"/>
    <rect x="14" y="31" width="28" height="11" rx="5.5" fill="#6366f1"/>
    <rect x="14" y="74" width="50" height="8" rx="4" fill="#e5e7eb"/>
    <rect x="14" y="86" width="42" height="8" rx="4" fill="#e5e7eb"/>
    <rect x="14" y="98" width="46" height="8" rx="4" fill="#e5e7eb"/>
    <path d="M76 72 l8 0 m-3-5 l5 5 l-5 5" stroke="#a5b4fc" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="88" y="26" width="64" height="92" rx="7" fill="#f8f9ff" stroke="#e0e7ff" stroke-width="1.5"/>
    <rect x="88" y="26" width="64" height="38" rx="7" fill="#e0e7ff"/>
    <rect x="88" y="52" width="64" height="12" fill="#e0e7ff"/>
    <rect x="94" y="31" width="28" height="11" rx="5.5" fill="#6366f1"/>
    <rect x="94" y="74" width="50" height="8" rx="4" fill="#e5e7eb"/>
    <rect x="94" y="86" width="42" height="8" rx="4" fill="#e5e7eb"/>
    <rect x="94" y="98" width="46" height="8" rx="4" fill="#e5e7eb"/>
    <path d="M156 72 l8 0 m-3-5 l5 5 l-5 5" stroke="#a5b4fc" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="168" y="26" width="64" height="92" rx="7" fill="#f8f9ff" stroke="#e0e7ff" stroke-width="1.5"/>
    <rect x="168" y="26" width="64" height="38" rx="7" fill="#e0e7ff"/>
    <rect x="168" y="52" width="64" height="12" fill="#e0e7ff"/>
    <rect x="174" y="31" width="28" height="11" rx="5.5" fill="#6366f1"/>
    <rect x="174" y="74" width="50" height="8" rx="4" fill="#e5e7eb"/>
    <rect x="174" y="86" width="42" height="8" rx="4" fill="#e5e7eb"/>
    <rect x="174" y="98" width="46" height="8" rx="4" fill="#e5e7eb"/>
  </svg>`,

  'step-c': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <line x1="38" y1="20" x2="38" y2="130" stroke="#e0e7ff" stroke-width="2.5" stroke-dasharray="4 3"/>
    <circle cx="38" cy="30" r="14" fill="#6366f1"/>
    <text x="38" y="35" text-anchor="middle" font-size="13" fill="#fff" font-weight="700" font-family="sans-serif">1</text>
    <rect x="62" y="23" width="86" height="10" rx="5" fill="#6366f1" opacity="0.82"/>
    <rect x="62" y="38" width="128" height="8" rx="4" fill="#e5e7eb"/>
    <circle cx="38" cy="78" r="14" fill="#6366f1"/>
    <text x="38" y="83" text-anchor="middle" font-size="13" fill="#fff" font-weight="700" font-family="sans-serif">2</text>
    <rect x="62" y="71" width="86" height="10" rx="5" fill="#6366f1" opacity="0.82"/>
    <rect x="62" y="86" width="128" height="8" rx="4" fill="#e5e7eb"/>
    <circle cx="38" cy="120" r="14" fill="#6366f1"/>
    <text x="38" y="125" text-anchor="middle" font-size="13" fill="#fff" font-weight="700" font-family="sans-serif">3</text>
    <rect x="62" y="113" width="86" height="10" rx="5" fill="#6366f1" opacity="0.82"/>
    <rect x="62" y="128" width="128" height="8" rx="4" fill="#e5e7eb"/>
  </svg>`,

  'voice-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#f9fafb"/>
    <rect x="80" y="6" width="80" height="12" rx="6" fill="#e5e7eb"/>
    <rect x="6" y="26" width="68" height="100" rx="7" fill="#fff" stroke="#e5e7eb" stroke-width="1.2"/>
    <circle cx="40" cy="52" r="18" fill="#dbeafe"/>
    <rect x="14" y="78" width="52" height="9" rx="4" fill="#e5e7eb"/>
    <rect x="14" y="92" width="52" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="14" y="103" width="40" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="14" y="114" width="46" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="86" y="26" width="68" height="100" rx="7" fill="#fff" stroke="#e5e7eb" stroke-width="1.2"/>
    <circle cx="120" cy="52" r="18" fill="#dbeafe"/>
    <rect x="94" y="78" width="52" height="9" rx="4" fill="#e5e7eb"/>
    <rect x="94" y="92" width="52" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="94" y="103" width="40" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="94" y="114" width="46" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="166" y="26" width="68" height="100" rx="7" fill="#fff" stroke="#e5e7eb" stroke-width="1.2"/>
    <circle cx="200" cy="52" r="18" fill="#dbeafe"/>
    <rect x="174" y="78" width="52" height="9" rx="4" fill="#e5e7eb"/>
    <rect x="174" y="92" width="52" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="174" y="103" width="40" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="174" y="114" width="46" height="7" rx="3" fill="#f3f4f6"/>
  </svg>`,

  'voice-b': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#f9fafb"/>
    <rect x="80" y="6" width="80" height="12" rx="6" fill="#e5e7eb"/>
    <rect x="6" y="26" width="68" height="102" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="6" y="26" width="68" height="20" rx="5" fill="#22c55e"/>
    <rect x="6" y="38" width="68" height="8" fill="#22c55e"/>
    <rect x="10" y="54" width="42" height="12" rx="6" fill="#f3f4f6"/>
    <rect x="22" y="72" width="42" height="12" rx="6" fill="#dcfce7"/>
    <rect x="10" y="90" width="36" height="12" rx="6" fill="#f3f4f6"/>
    <rect x="22" y="108" width="42" height="12" rx="6" fill="#dcfce7"/>
    <rect x="86" y="26" width="68" height="102" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="86" y="26" width="68" height="20" rx="5" fill="#22c55e"/>
    <rect x="86" y="38" width="68" height="8" fill="#22c55e"/>
    <rect x="90" y="54" width="42" height="12" rx="6" fill="#f3f4f6"/>
    <rect x="102" y="72" width="42" height="12" rx="6" fill="#dcfce7"/>
    <rect x="90" y="90" width="36" height="12" rx="6" fill="#f3f4f6"/>
    <rect x="102" y="108" width="42" height="12" rx="6" fill="#dcfce7"/>
    <rect x="166" y="26" width="68" height="102" rx="5" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="166" y="26" width="68" height="20" rx="5" fill="#22c55e"/>
    <rect x="166" y="38" width="68" height="8" fill="#22c55e"/>
    <rect x="170" y="54" width="42" height="12" rx="6" fill="#f3f4f6"/>
    <rect x="182" y="72" width="42" height="12" rx="6" fill="#dcfce7"/>
    <rect x="170" y="90" width="36" height="12" rx="6" fill="#f3f4f6"/>
    <rect x="182" y="108" width="42" height="12" rx="6" fill="#dcfce7"/>
  </svg>`,

  'cta-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="ca-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#ca-g)"/>
    <rect x="62" y="20" width="116" height="15" rx="7" fill="#fff" opacity="0.92"/>
    <rect x="82" y="42" width="76" height="10" rx="5" fill="#fff" opacity="0.6"/>
    <rect x="90" y="56" width="60" height="10" rx="5" fill="#fff" opacity="0.6"/>
    <rect x="52" y="80" width="136" height="38" rx="19" fill="#f59e0b"/>
    <rect x="70" y="92" width="100" height="14" rx="7" fill="#fff" opacity="0.9"/>
  </svg>`,

  'cta-b': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="cb-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#cb-g)"/>
    <rect x="70" y="7" width="100" height="12" rx="6" fill="#fff" opacity="0.82"/>
    <rect x="14" y="27" width="212" height="68" rx="8" fill="#fff" opacity="0.95"/>
    <circle cx="30" cy="47" r="6" fill="#f59e0b"/>
    <rect x="42" y="42" width="164" height="10" rx="5" fill="#e5e7eb"/>
    <circle cx="30" cy="64" r="6" fill="#f59e0b"/>
    <rect x="42" y="59" width="144" height="10" rx="5" fill="#e5e7eb"/>
    <circle cx="30" cy="81" r="6" fill="#f59e0b"/>
    <rect x="42" y="76" width="154" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="52" y="104" width="136" height="30" rx="15" fill="#f59e0b"/>
    <rect x="70" y="113" width="100" height="12" rx="6" fill="#fff" opacity="0.9"/>
  </svg>`,

  'content-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <rect x="12" y="16" width="100" height="12" rx="6" fill="#c7d2fe"/>
    <rect x="12" y="34" width="80" height="9" rx="4" fill="#e0e7ff"/>
    <rect x="12" y="50" width="98" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="12" y="62" width="88" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="12" y="74" width="94" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="12" y="90" width="72" height="22" rx="11" fill="#6366f1"/>
    <rect x="128" y="16" width="100" height="100" rx="10" fill="#e0e7ff"/>
    <rect x="140" y="28" width="76" height="76" rx="6" fill="#c7d2fe" opacity="0.5"/>
  </svg>`,

  'content-b': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <rect x="12" y="16" width="100" height="100" rx="10" fill="#e0e7ff"/>
    <rect x="24" y="28" width="76" height="76" rx="6" fill="#c7d2fe" opacity="0.5"/>
    <rect x="128" y="16" width="100" height="12" rx="6" fill="#c7d2fe"/>
    <rect x="128" y="34" width="80" height="9" rx="4" fill="#e0e7ff"/>
    <rect x="128" y="50" width="98" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="128" y="62" width="88" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="128" y="74" width="94" height="7" rx="3" fill="#f3f4f6"/>
    <rect x="128" y="90" width="72" height="22" rx="11" fill="#6366f1"/>
  </svg>`,

  'content-c': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="cc-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a5b4fc"/><stop offset="100%" stop-color="#ddd6fe"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#cc-g)" opacity="0.4"/>
    <rect width="240" height="140" fill="#fff" opacity="0.7"/>
    <rect x="12" y="16" width="100" height="11" rx="5" fill="#6366f1" opacity="0.8"/>
    <rect x="12" y="33" width="78" height="8" rx="4" fill="#6366f1" opacity="0.5"/>
    <rect x="12" y="48" width="96" height="6" rx="3" fill="#9ca3af"/>
    <rect x="12" y="60" width="86" height="6" rx="3" fill="#9ca3af"/>
    <rect x="12" y="72" width="92" height="6" rx="3" fill="#9ca3af"/>
    <rect x="12" y="87" width="70" height="20" rx="10" fill="#6366f1"/>
    <rect x="128" y="16" width="100" height="100" rx="10" fill="#e0e7ff"/>
    <rect x="140" y="28" width="76" height="76" rx="6" fill="#c7d2fe" opacity="0.6"/>
  </svg>`,

  'content-d': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#1e1b4b"/>
    <rect width="240" height="140" fill="#000" opacity="0.35"/>
    <rect x="12" y="16" width="100" height="11" rx="5" fill="#fff" opacity="0.92"/>
    <rect x="12" y="33" width="78" height="8" rx="4" fill="#fff" opacity="0.6"/>
    <rect x="12" y="48" width="96" height="6" rx="3" fill="#fff" opacity="0.45"/>
    <rect x="12" y="60" width="86" height="6" rx="3" fill="#fff" opacity="0.45"/>
    <rect x="12" y="72" width="92" height="6" rx="3" fill="#fff" opacity="0.45"/>
    <rect x="12" y="87" width="70" height="20" rx="10" fill="#f59e0b"/>
    <rect x="128" y="16" width="100" height="100" rx="10" fill="#fff" opacity="0.12"/>
    <rect x="140" y="28" width="76" height="76" rx="6" fill="#fff" opacity="0.07"/>
  </svg>`,

  'card-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#f9fafb"/>
    <rect x="80" y="6" width="80" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="8" y="24" width="68" height="106" rx="8" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
    <rect x="8" y="24" width="68" height="44" rx="8" fill="#e0e7ff"/>
    <rect x="8" y="56" width="68" height="12" fill="#e0e7ff"/>
    <rect x="16" y="78" width="52" height="8" rx="4" fill="#6366f1" opacity="0.7"/>
    <rect x="16" y="92" width="52" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="16" y="102" width="44" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="20" y="114" width="44" height="10" rx="5" fill="#6366f1"/>
    <rect x="86" y="24" width="68" height="106" rx="8" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
    <rect x="86" y="24" width="68" height="44" rx="8" fill="#e0e7ff"/>
    <rect x="86" y="56" width="68" height="12" fill="#e0e7ff"/>
    <rect x="94" y="78" width="52" height="8" rx="4" fill="#6366f1" opacity="0.7"/>
    <rect x="94" y="92" width="52" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="94" y="102" width="44" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="98" y="114" width="44" height="10" rx="5" fill="#6366f1"/>
    <rect x="164" y="24" width="68" height="106" rx="8" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
    <rect x="164" y="24" width="68" height="44" rx="8" fill="#e0e7ff"/>
    <rect x="164" y="56" width="68" height="12" fill="#e0e7ff"/>
    <rect x="172" y="78" width="52" height="8" rx="4" fill="#6366f1" opacity="0.7"/>
    <rect x="172" y="92" width="52" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="172" y="102" width="44" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="176" y="114" width="44" height="10" rx="5" fill="#6366f1"/>
  </svg>`,

  'card-b': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#f9fafb"/>
    <rect x="80" y="6" width="80" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="8" y="24" width="106" height="106" rx="8" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
    <rect x="8" y="24" width="106" height="56" rx="8" fill="#e0e7ff"/>
    <rect x="8" y="68" width="106" height="12" fill="#e0e7ff"/>
    <rect x="18" y="92" width="78" height="8" rx="4" fill="#6366f1" opacity="0.7"/>
    <rect x="18" y="105" width="78" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="30" y="118" width="60" height="10" rx="5" fill="#6366f1"/>
    <rect x="126" y="24" width="106" height="106" rx="8" fill="#fff" stroke="#e5e7eb" stroke-width="1.5"/>
    <rect x="126" y="24" width="106" height="56" rx="8" fill="#e0e7ff"/>
    <rect x="126" y="68" width="106" height="12" fill="#e0e7ff"/>
    <rect x="136" y="92" width="78" height="8" rx="4" fill="#6366f1" opacity="0.7"/>
    <rect x="136" y="105" width="78" height="6" rx="3" fill="#e5e7eb"/>
    <rect x="148" y="118" width="60" height="10" rx="5" fill="#6366f1"/>
  </svg>`,

  'faq-a': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fff"/>
    <rect x="80" y="6" width="80" height="10" rx="5" fill="#e5e7eb"/>
    <rect x="12" y="26" width="216" height="1" fill="#e5e7eb"/>
    <rect x="12" y="30" width="26" height="18" rx="6" fill="#6366f1"/>
    <rect x="44" y="34" width="144" height="9" rx="4" fill="#374151"/>
    <rect x="12" y="55" width="26" height="18" rx="6" fill="#a5b4fc"/>
    <rect x="44" y="59" width="156" height="7" rx="3" fill="#9ca3af"/>
    <rect x="44" y="70" width="120" height="7" rx="3" fill="#9ca3af"/>
    <rect x="12" y="84" width="216" height="1" fill="#e5e7eb"/>
    <rect x="12" y="88" width="26" height="18" rx="6" fill="#6366f1"/>
    <rect x="44" y="92" width="130" height="9" rx="4" fill="#374151"/>
    <rect x="12" y="113" width="26" height="18" rx="6" fill="#a5b4fc"/>
    <rect x="44" y="117" width="150" height="7" rx="3" fill="#9ca3af"/>
    <rect x="12" y="138" width="216" height="1" fill="#e5e7eb"/>
  </svg>`,

  'step-b': `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="140" fill="#fafafa"/>
    <rect x="80" y="8" width="80" height="10" rx="5" fill="#e5e7eb"/>
    <polygon points="8,38 66,38 78,70 66,102 8,102" fill="#6366f1"/>
    <rect x="18" y="55" width="38" height="7" rx="3" fill="#fff" opacity="0.8"/>
    <rect x="18" y="67" width="32" height="7" rx="3" fill="#fff" opacity="0.6"/>
    <polygon points="70,38 128,38 140,70 128,102 70,102 82,70" fill="#818cf8"/>
    <rect x="82" y="55" width="38" height="7" rx="3" fill="#fff" opacity="0.8"/>
    <rect x="82" y="67" width="32" height="7" rx="3" fill="#fff" opacity="0.6"/>
    <polygon points="132,38 190,38 202,70 190,102 132,102 144,70" fill="#a5b4fc"/>
    <rect x="144" y="55" width="38" height="7" rx="3" fill="#fff" opacity="0.8"/>
    <rect x="144" y="67" width="32" height="7" rx="3" fill="#fff" opacity="0.6"/>
    <polygon points="194,38 232,38 232,102 194,102 206,70" fill="#c7d2fe"/>
    <rect x="200" y="55" width="24" height="7" rx="3" fill="#6366f1" opacity="0.7"/>
    <rect x="200" y="67" width="20" height="7" rx="3" fill="#6366f1" opacity="0.5"/>
  </svg>`,
};
