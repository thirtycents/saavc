const ipfsClient = require('ipfs-http-client');
const fs = require('fs');

// 连接到IPFS节点
const ipfs = ipfsClient({ host: '', port: 5001, protocol: 'https' });

async function uploadToIPFS(filePath) {
  const file = fs.readFileSync(filePath);
  const filesAdded = await ipfs.add({ path: filePath, content: file }, { wrapWithDirectory: true });

  // filesAdded是一个数组，其中包含了添加到IPFS的文件信息
  console.log('File uploaded to IPFS:', filesAdded.cid);

}

async function downloadFromIPFS(cid) {
  const stream = ipfs.cat(cid);
  let data = '';

  for await (const chunk of stream) {
    data += chunk.toString();
  }

  console.log('DID Document retrieved from IPFS:', data);
  return data;
}
// 调用函数上传DID文档
uploadToIPFS('didDocument.json').catch(console.error);

// CID
const cid = 'DIDDocumentCID';

// 调用函数检索DID文档
downloadFromIPFS(cid).catch(console.error);
