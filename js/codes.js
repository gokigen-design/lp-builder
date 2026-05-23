// js/codes.js
// 平文のコードはここに書かない。SHA-256ハッシュ値のみ。
// 新しいコードを追加するには: node -e "const c=require('crypto');console.log(c.createHash('sha256').update('コード').digest('hex'))"
const VALID_CODE_HASHES = [
  // 'test2026'
  '7997237f84ee2b94d404fb9e1f4ba3f86c52e12aac1de0f9e5685051293ffb68',
  // 'otaku2026'
  'ebd3b413c532bc9c9ccc3e15366f0603c22a7c431735899f790acdc2c795f695',
];
