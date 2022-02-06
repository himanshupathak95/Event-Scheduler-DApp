const TodoList = artifacts.require("./TodoList.sol");

module.exports = function (deployer) {
  deployer.deploy(TodoList, "This is a message");
};
