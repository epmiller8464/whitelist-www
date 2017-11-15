'use strict';

var crypto = require('crypto');

var ENCRYPTION_KEY = process.env.PK; // Must be 256 bytes (32 characters)
var IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  var iv = crypto.randomBytes(IV_LENGTH);
  var cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  var encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  var textParts = text.split(':');
  var iv = Buffer.from(textParts.shift(), 'hex');
  var encryptedText = Buffer.from(textParts.join(':'), 'hex');
  var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  var decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { decrypt: decrypt, encrypt: encrypt };
//# sourceMappingURL=crypto.js.map