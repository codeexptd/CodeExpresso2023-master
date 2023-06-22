import CryptoJS from "crypto-js";

const secretKey = "1SDN5usNa30AKE9GjI2IGxTJbo51P0R5aFx6iXl1KtUTlmis2d";

export class Token {
  constructor(cat, diff, level, token) {
    this.cat = cat;
    this.level = level;
    this.diff = diff;
    this.token = null;
  }
  static encrypt(message) {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
  }
  static decrypt(targetMessage) {
    let bytes = CryptoJS.AES.decrypt(targetMessage, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  set(cat, diff, level, token) {
    this.cat = cat;
    this.diff = diff;
    this.level = level;
    this.token = token;
  }
}
