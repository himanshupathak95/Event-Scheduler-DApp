App = {
  loading: false, // So that it can be changed later
  contracts: {}, // Storing the contracts

  load: async () => {
    await App.loadWeb3(); // Loading web3 library to connect to the blockchain
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    web3.eth.defaultAccount = web3.eth.accounts[0]; // Default account as the first account
  },

  // this is metamask specified configuration
  loadWeb3: async () => {
    if (typeof web3 !== "undefined") {
      // Talking to blockchain with means of Web3
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Please connect to Metamask");
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log("This browser doesn't support ethereum. Connect MetaMask");
    }
  },

  loadAccount: async () => {
    // Setting the current blockchain account
    App.account = web3.eth.accounts[0];
  },

  loadContract: async () => {
    // Creating a JavaScript version of the smart contract
    const eventScheduler = await $.getJSON("EventScheduler.json");
    App.contracts.EventScheduler = TruffleContract(eventScheduler); // Creating Truffle contract
    App.contracts.EventScheduler.setProvider(App.web3Provider); // Now able to call functions of  the contact
    // Setting the contract with values from the blockchain
    App.eventScheduler = await App.contracts.EventScheduler.deployed();
  },

  render: async () => {
    // Preventing multiple renders
    if (App.loading) {
      return;
    }
    // Updating app loading state to take changes
    App.setLoading(true);
    // Rendering Account
    $("#account").html(App.account);
    // Rendering the Tasks
    await App.renderTasks();
    // Updating loading state back to false
    App.setLoading(false);
  },

  renderTasks: async () => {
    // Loading the total task count from the blockchain
    const taskCount = await App.eventScheduler.taskCount();
    const $taskTemplate = $(".taskTemplate"); // Fetching task template
    // Rendering out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetching the task data from the blockchain
      const task = await App.eventScheduler.tasks(i);
      const taskId = task[0].toNumber(); // is the id
      const taskContent = task[1]; // is the content
      const taskCompleted = task[2]; // is the completed

      // Creating the html for the task
      const $newTaskTemplate = $taskTemplate.clone();
      $newTaskTemplate.find(".content").html(taskContent);
      $newTaskTemplate // Assigning the input to the html
        .find("input")
        .prop("name", taskId)
        .prop("checked", taskCompleted)
        .on("click", App.toggleCompleted);

      // Putting the task in its respective list
      if (taskCompleted) {
        $("#completedTaskList").append($newTaskTemplate);
      } else {
        $("#taskList").append($newTaskTemplate);
      }
      // Finally, showing the task
      $newTaskTemplate.show();
    }
  },

  createTask: async () => {
    App.setLoading(true);
    const content = $("#newTask").val(); // Fetching content of the task created
    await App.eventScheduler.createTask(content); // Passing the fetched content to our contract
    window.location.reload(); // Refreshing the page 
  },

  toggleCompleted: async (e) => { // This is an onClick event
    App.setLoading(true);
    const taskId = e.target.name; // Taking name (taskid) of the checkbox from the event
    await App.eventScheduler.toggleCompleted(taskId); // Calling our contract to toggle this 
    window.location.reload(); // Refreshing the page
  },

  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $("#loader"); // To show the loader on the page while loading
    const content = $("#content"); // To show the content on the page after loading
    if (boolean) {
      loader.show();
      content.hide(); // Hiding content while loading
    } else {
      loader.hide(); // Hiding the loader after loading
      content.show(); // Showing the content after loading
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
