// js/sections-config.js
const SECTIONS_CONFIG = {
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
};

// サイドバーに表示する順番（追加可能セクションの一覧）
const SECTION_TYPES_ORDER = ['hero', 'mondai', 'step', 'voice', 'cta'];

// デザインピッカー用サムネイルSVG（レイアウトスケッチ）
const DESIGN_THUMBS = {

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
};
