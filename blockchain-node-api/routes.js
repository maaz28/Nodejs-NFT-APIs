
function routes(app, nftContract, web3) {

  fetchTokenMetadata = async (tokenId) => {
    return await nftContract.methods.tokenURI(tokenId).call({from : process.env.PUBLIC_KEY}).catch(err => {console.log(err); throw(err)});
  } 

  // get metadata for a specific token
	app.get('/nftmint/:id', async (request, response) => {
    await fetchTokenMetadata(request.params.id).then(res => response.json(res)).catch(err => response.json(err))
  });

  // get tokenslist
  app.get('/nftmint', async (request, response) => {
    const promises = []
		const COUNTER = await nftContract.methods.totalSupply().call();
    console.log(COUNTER, "counter")
    for(let i=1; i<=COUNTER; i++){
      promises.push(fetchTokenMetadata(i))
    }
    Promise.all(promises)
  .then(res => {
    console.log(res)
    response.json(res)
  }) 
  .catch(error => console.log(`Error in executing ${error}`)) // Promise.all throws an error.
  });

  // mint an NFT
  app.post('/nftmint', async (request, response) => {
      const txCount = await web3.eth.getTransactionCount(process.env.PUBLIC_KEY)
    console.log(txCount, "nonce");
    const receipt = await nftContract.methods.mint(1).send({ from: process.env.PUBLIC_KEY, gas: 100000,
    gasPrice: 300000000000, nonce: txCount, value : 0 }, function (err, hash) {
            if (err) {
              console.log(err)
            }
            else {
              console.log(hash)
            }
          });
    console.log(receipt)
    response.json(receipt);
  });
}

module.exports = routes
