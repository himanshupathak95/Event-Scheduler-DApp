// SPDX-License-Identifier: Unlicensed
// pragma solidity ^0.5.0;
pragma solidity >=0.4.17 <0.9.0;

contract TodoList {
  uint256 public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  constructor() public {
    createTask("life is good");
  }

  function createTask(string memory _content) public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
  }


}
