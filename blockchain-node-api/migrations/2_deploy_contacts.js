const contract = artifacts.require("./SampleNft.sol");

module.exports = function(deployer) {
  deployer.deploy(contract);
};
