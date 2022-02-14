// SPDX-License-Identifier: Unlicensed
// pragma solidity ^0.5.0;
pragma solidity >=0.4.17 <0.9.0;

contract EventScheduler {
  // keep track of the number of tasks
  uint256 public taskCount = 0;

  struct Task {
    uint id; // to identify tasks
    string content; // to hold content inside them
    bool completed; // to manipulate their state .i.e, completed or not
  }

  // mapping id with the structure
  mapping(uint => Task) public tasks;

  // to create new tasks
  event TaskCreated( 
    uint id,
    string content,
    bool completed
  );

  // to identify completed tasks
  event TaskCompleted(
    uint id,
    bool completed
  );

  // default event - to test listing of tasks
  // constructor() public {
  //   createTask("Your events will appear like this ");
  // }

  function createTask(string memory _content) public {
    taskCount++; // counts increases with new tasks added
    tasks[taskCount] = Task(taskCount, _content, false); // initialising structure 
    emit TaskCreated(taskCount, _content, false); //emitting initialised structure (task)
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id]; // getting the task by the id
    _task.completed = !_task.completed; // reverting the completed state => from true to false and from false to true to toggle in and out of the completed list
    tasks[_id] = _task; // returning it back after changing the 'completed' state
    emit TaskCompleted(_id, _task.completed);
  }

}
