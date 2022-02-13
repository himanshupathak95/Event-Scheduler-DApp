const { assert } = require("chai");

const EventScheduler = artifacts.require("./EventScheduler.sol");

contract("EventScheduler", (accounts) => {
  before(async () => {
    this.eventScheduler = await EventScheduler.deployed();
  });

  it("deploys successfully", async () => {
    const address = await this.eventScheduler.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, " ");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("lists tasks", async () => {
    const taskCount = await this.eventScheduler.taskCount();
    const task = await this.eventScheduler.tasks(taskCount);
    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(task.content, "Your events will appear like this ");
    assert.equal(task.completed, false);
    assert.equal(taskCount.toNumber(), 1);
  });

  it("creates tasks", async () => {
    const result = await this.eventScheduler.createTask("A new task");
    const taskCount = await this.eventScheduler.taskCount();
    assert.equal(taskCount, 2);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.content, "A new task");
    assert.equal(event.completed, false);
  });

  it("toggles task completion", async () => {
    const result = await this.eventScheduler.toggleCompleted(1);
    const task = await this.eventScheduler.tasks(1);
    assert.equal(task.completed, true);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.completed, true);
  });
});
