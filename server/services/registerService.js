//用户注册相关服务逻辑
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ipfs = require("../utils/ipfsUtils")
const controller = require("../controllers/registerController")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  // 这里将处理注册逻辑
  const { username, email, walletAddress } = req.body; //获取数据
  //生成DID文档
  const didDocument = {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: `did:ethr:${walletAddress}`, // 使用钱包地址作为DID的一部分
    neme:username,
    email:email,
    publicKey: [{
      id: `did:ethr:${walletAddress}#keys-1`,
      type: 'Secp256k1VerificationKey2018',
      controller: `did:ethr:${walletAddress}`,
      publicKeyHex: walletAddress // 
    }],
    authentication: [{
      id: `did:ethr:${walletAddress}#keys-1`,
      type: 'Secp256k1SignatureAuthentication2018',
      publicKey: `did:ethr:${walletAddress}#keys-1`,
    }],
    service: [{
      id: `did:ethr:${walletAddress}#vcs`,
      type: 'VerifiableCredentialService',
      serviceEndpoint: ``,
    }],
    created: new Date().toISOString(),
  };

  try {
    const cid = await ipfs.uploadToIPFS(JSON.stringify(didDocument)); // 上传DID文档到IPFS并获取CID
    console.log('Uploaded DID document. CID:', cid);

    // 在这里进行其他处理，例如将CID保存到数据库等
    // controller.storeDIDInContract(walletAddress,cid);
    res.status(200).json({ cid });
  } catch (error) {
    console.error('Failed to upload DID document to IPFS:', error);
    res.status(500).json({ error: 'Failed to upload DID document to IPFS' });
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
