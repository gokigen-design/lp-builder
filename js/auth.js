// js/auth.js
const Auth = {
  async sha256(str) {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(str.trim().toLowerCase())
    );
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  async validate(code) {
    const hash = await Auth.sha256(code);
    return VALID_CODE_HASHES.includes(hash);
  }
};
