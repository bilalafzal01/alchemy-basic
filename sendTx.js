const main = async () => {
  require('dotenv').config()
  const { API_URL, PRIVATE_KEY } = process.env
  const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
  const web3 = createAlchemyWeb3(API_URL)

  const myAddress = '0xB13D18EB040D5C6598DaD02554b4683407d72203'
  const nonce = await web3.eth.getTransactionCount(myAddress, 'latest')

  const value = web3.utils.toWei('1', 'ether')
  //   * send MATIC from my account to another account
  const transaction = {
    to: '0x8959D37a6DE7B90b71b37e302f1F938a486A11a3',
    value,
    gas: 30000,
    nonce,
    maxFeePerGas: 2500000001,
  }

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY,
  )

  web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
    if (error) {
      console.log(
        '❗Something went wrong while submitting your transaction:',
        error,
      )
    } else {
      console.log(
        '🎉 The hash of your transaction is: ',
        hash,
        "\n Check Alchemy's Mempool to view the status of your transaction!",
      )
    }
  })
}

main()
