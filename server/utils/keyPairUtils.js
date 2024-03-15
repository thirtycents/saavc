const crypto = require('crypto');
const { encode } = require('@stablelib/base64');

function generateDIDKeyPair() {
  // 生成一个ECDSA P-256密钥对
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'P-256',
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  return { publicKey, privateKey };
}


