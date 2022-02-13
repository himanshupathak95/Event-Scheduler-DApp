const EventScheduler = artifacts.require("./EventScheduler.sol");

module.exports = function (deployer) {
  deployer.deploy(EventScheduler);
};
