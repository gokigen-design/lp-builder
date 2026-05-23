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
