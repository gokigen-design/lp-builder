// js/forms.js
// type: 'text' | 'textarea' | 'image' | 'url' | 'items'
// items = 繰り返し項目（悩みリスト・ステップ・声など）
const FORMS_CONFIG = {
  midashi: {
    fields: [
      { key: 'heading',    label: '見出しテキスト',           type: 'text', placeholder: '例：サービスの特徴' },
      { key: 'subheading', label: 'サブテキスト（任意・空でもOK）', type: 'text', placeholder: '例：3つのこだわりでサポートします' },
    ]
  },
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
  content: {
    fields: [
      { key: 'heading',    label: '見出し',                             type: 'text',     placeholder: '例：サービスの特徴' },
      { key: 'subheading', label: 'サブ見出し',                         type: 'text',     placeholder: '例：3つのこだわり' },
      { key: 'body',       label: '本文テキスト',                       type: 'textarea', placeholder: '例：サービスの詳細説明文をここに入力してください。' },
      { key: 'ctaText',    label: 'ボタンテキスト',                     type: 'text',     placeholder: '例：詳しく見る' },
      { key: 'ctaUrl',     label: 'ボタンURL',                          type: 'url',      placeholder: 'https://...' },
      { key: 'image',      label: '画像',                               type: 'image',    placeholder: '' },
      { key: 'bgImage',    label: '背景画像（背景ありデザインのみ）',   type: 'image',    placeholder: '' },
    ]
  },
  card: {
    fields: [
      { key: 'heading', label: '見出し', type: 'text', placeholder: '例：サービスの特徴' },
      { key: 'ctaUrl',  label: 'カードのボタンURL（全カード共通）', type: 'url', placeholder: 'https://...' },
      {
        key: 'items',
        label: 'カード（2〜6個）',
        type: 'items',
        min: 2,
        max: 6,
        subfields: [
          { key: 'image',   label: '画像',       type: 'image',    placeholder: '' },
          { key: 'title',   label: '小見出し',   type: 'text',     placeholder: '例：特徴1' },
          { key: 'body',    label: '説明文',     type: 'textarea', placeholder: '例：詳細テキスト' },
          { key: 'ctaText', label: 'ボタン文字', type: 'text',     placeholder: '例：詳しく見る' },
        ]
      },
    ]
  },
  faq: {
    fields: [
      { key: 'heading', label: '見出し', type: 'text', placeholder: '例：よくあるご質問' },
      {
        key: 'items',
        label: 'Q&A（2〜10個）',
        type: 'items',
        min: 2,
        max: 10,
        subfields: [
          { key: 'question', label: '質問（Q）', type: 'text',     placeholder: '例：申し込み後はどうなりますか？' },
          { key: 'answer',   label: '回答（A）',  type: 'textarea', placeholder: '例：お申し込み後、24時間以内にメールをお送りします。' },
        ]
      },
    ]
  },
};
