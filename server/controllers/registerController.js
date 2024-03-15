// 处理注册相关操作的控制器
async function storeDIDInContract(walletAddress, cid) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const transactionParameters = {
      to: contractAddress,
      from: walletAddress,
      data: contract.methods.storeDID(walletAddress, cid).encodeABI(),
    };
  
    try {
      // MetaMask提供的eth_sendTransaction方法用于发起交易
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      console.log('Transaction Hash:', txHash);
      // 交易发送成功，处理相应逻辑
    } catch (error) {
      console.error('Error sending transaction:', error);
      // 处理错误
    }
  }