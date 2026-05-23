// js/forms.js
// type: 'text' | 'textarea' | 'image' | 'url' | 'items'
// items = 繰り返し項目（悩みリスト・ステップ・声など）
const FORMS_CONFIG = {
  hero: {
    fields: [
      { key: 'catchcopy',  label: 'キャッチコピー（大見出し）', type: 'text',     placeholder: '例：あなたのビジネスを加速する' },
      { key: 'subheading', label: 'サブ見出し',                  type: 'text',     placeholder: '例：女性起業家向けデザインサービス' },
      { key: 'bgImage',    label: '背景画像',                    type: 'image',    placeholder: '' },
      { key: 'ctaText',    label: 'ボタンのテキスト',            type: 'text',     placeholder: '例：今すぐ申し込む' },
      { key: 'ctaUrl',     label: '申し込みURL',                 type: 'url',      placeholder: 'https://...' },
    ]
  },
  mondai: {
    fields: [
      { key: 'heading',     label: '見出し',                          type: 'text',  placeholder: '例：こんなお悩みありませんか？' },
      { key: 'personImage', label: '人物写真（デザイン：人物囲み型のみ）', type: 'image', placeholder: '' },
      {
        key: 'items',
        label: 'お悩みリスト（3〜6個）',
        type: 'items',
        placeholder: '例：集客がうまくいかない',
        min: 3,
        max: 6
      },
    ]
  },
  step: {
    fields: [
      { key: 'heading', label: '見出し', type: 'text', placeholder: '例：サービス導入の流れ' },
      {
        key: 'items',
        label: 'ステップ（2〜5個）',
        type: 'items',
        placeholder: '',
        min: 2,
        max: 5,
        subfields: [
          { key: 'title', label: 'ステップタイトル', type: 'text',     placeholder: '例：ご相談の予約' },
          { key: 'body',  label: '説明文',           type: 'textarea', placeholder: '例：お問い合わせフォームよりご予約ください' },
          { key: 'image', label: '画像（横並びカード型のみ）', type: 'image', placeholder: '' },
        ]
      },
    ]
  },
  voice: {
    fields: [
      { key: 'heading', label: '見出し', type: 'text', placeholder: '例：お客様の声' },
      {
        key: 'items',
        label: '声（2〜6件）',
        type: 'items',
        placeholder: '',
        min: 2,
        max: 6,
        subfields: [
          { key: 'name',    label: 'お名前・肩書き', type: 'text',     placeholder: '例：田中さん（30代・フリーランス）' },
          { key: 'photo',   label: '顔写真',         type: 'image',    placeholder: '' },
          { key: 'comment', label: 'コメント',        type: 'textarea', placeholder: '例：受講して本当によかったです！' },
        ]
      },
    ]
  },
  cta: {
    fields: [
      { key: 'heading', label: '見出し',                          type: 'text',     placeholder: '例：まずはお気軽にご相談ください' },
      { key: 'bgImage', label: '背景画像（特典付きCTAのみ）',      type: 'image',    placeholder: '' },
      { key: 'tokuten', label: '特典テキスト（特典付きCTAのみ）',  type: 'textarea', placeholder: '例：今だけ！初回相談30分無料' },
      { key: 'ctaText', label: 'ボタンのテキスト',                type: 'text',     placeholder: '例：今すぐ申し込む' },
      { key: 'ctaUrl',  label: '申し込みURL',                     type: 'url',      placeholder: 'https://...' },
    ]
  },
};
