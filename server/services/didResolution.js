const crypto = require('crypto');

class DIDDocument {
  constructor(didDocStr) {
    this.doc = JSON.parse(didDocStr);
  }

  getId() {
    return this.doc.id;
  }

  getPublicKeys() {
    return this.doc.publicKey;
  }

  getAuthentication() {
    return this.doc.authentication;
  }

  getAssertionMethod() {
    return this.doc.assertionMethod;
  }

  getServices() {
    return this.doc.service;
  }

  getProof() {
    return this.doc.proof;
  }

  verifySignature() {
    const message = JSON.stringify(this.doc, Object.keys(this.doc).sort(), 2);
    const messageHash = keccak256(message);

    const publicKey = Buffer.from(this.getPublicKeyHex(), 'hex');
    const signature = Buffer.from(this.getProof().signatureValue, 'base64');

    // ECDSA签名在这里需要转换，因为secp256k1库期望签名作为(r, s)对出现，而不是直接的字节串。
  

    // 尝试恢复公钥
    const recoveredPublicKey = secp256k1.ecdsaRecover(signature, 1, messageHash, true);

    // 验证恢复的公钥是否与文档中的公钥相匹配
    return secp256k1.publicKeyVerify(recoveredPublicKey) && publicKey.equals(recoveredPublicKey);
  }
}



// 示例DID文档字符串
const didDocStr = `你的DID文档字符串`;

// 使用DID文档
const didDoc = new DIDDocument(didDocStr);

// 访问特定信息示例
console.log("DID Identifier:", didDoc.getId());
console.log("Public Keys:", didDoc.getPublicKeys());
console.log("Services:", didDoc.getServices());

// 如果需要验证签名
if (didDoc.verifySignature()) {
  console.log("Signature verified.");
} else {
  console.log("Signature verification failed.");
}
