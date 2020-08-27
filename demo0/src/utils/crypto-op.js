import Crypto from 'crypto-js';

const key = Crypto.enc.Utf8.parse("wxyy"); //16位
const iv = Crypto.enc.Utf8.parse("wxyynozz");

export const Encrypto = word => {
  let encrypted = "";
  const srcs = Crypto.enc.Utf8.parse(word);
  encrypted = Crypto.AES.encrypt(srcs, key, {
    iv: iv,
    mode: Crypto.mode.CBC,
    padding: Crypto.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

export const Decrypto = (word) => {
  const encryptedHexStr = Crypto.enc.Hex.parse(word);
  const srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
  const decrypt = Crypto.AES.decrypt(srcs, key, {
    iv: iv,
    mode: Crypto.mode.CBC,
    padding: Crypto.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(Crypto.enc.Utf8);
  return decryptedStr.toString();
}