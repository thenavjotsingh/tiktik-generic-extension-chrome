// Function to read configuration file
function readConfig(callback) {
    fetch('../config.json') // Adjust the path as needed
      .then(response => response.json())
      .then(data => {
        callback(data);
      });
  }
  
  // Initialize the target dates
  let targetDate, targetDate2, targetDate3;
  
  // Read the configuration and set the initial target dates
  readConfig(data => {
    targetDate = new Date(data.timer1).getTime();
    targetDate2 = new Date(data.timer2).getTime();
    targetDate3 = new Date(data.timer3).getTime();
  
    // Call the updateCountdown function to start the countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });

// Function to update countdown timers
function updateCountdown() {
  const currentDate = new Date().getTime();
  const timeRemaining = targetDate - currentDate;
  const timeRemaining2 = targetDate2 - currentDate;
  const timeRemaining3 = targetDate3 - currentDate;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor(timeRemaining / 1000);
  const years = days / 365; // A simple approximation for years
   const days2 = Math.floor(timeRemaining2 / (1000 * 60 * 60 * 24));
   const days3 = Math.floor(timeRemaining3 / (1000 * 60 * 60 * 24));
 
  // Update the timer elements in your HTML
  document.getElementById("timer1").innerHTML = `~Days Remaining for Event-1: <span class="countdown-inner">${days}</span>`;
  document.getElementById("timer2").innerHTML = `~Hours Remaining for Event-1: <span class="countdown-inner">${hours}</span>`;
  document.getElementById("timer3").innerHTML = `~Seconds Remaining for Event-1: <span class="countdown-inner">${seconds}</span>`;
  document.getElementById("timer4").innerHTML = `~Years Remaining for Event-1: <span class="countdown-inner">${years.toFixed(2)}</span>`;
  document.getElementById("timer5").innerHTML = `Days Remaining for Event-2 <span class="countdown-inner">${days2}</span>`;
  document.getElementById("timer6").innerHTML = `Days Remaining for Event-3 <span class="countdown-inner">${days3}</span>`;
}

// Call the updateCountdown function to start the countdown
updateCountdown();

// Update the countdown every second (1000 milliseconds)
setInterval(updateCountdown, 1000);

//todolist
// Function to retrieve the to-do list from local storage
function getTodoList() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    return todoList;
  }
  
  // Function to update the to-do list in local storage
  function updateTodoList(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
  
  // Function to display the to-do list
  function displayTodoList() {
    const todoList = getTodoList();
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';
  
    for (let i = 0; i < todoList.length; i++) {
      const task = todoList[i].task;
      const checked = todoList[i].checked;
  
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = checked;
      checkbox.addEventListener('change', function () {
        todoList[i].checked = checkbox.checked;
        updateTodoList(todoList);
      });
  
      const taskText = document.createElement('span');
      taskText.textContent = task;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function () {
        const updatedTask = prompt('Edit the task:', task);
        if (updatedTask !== null) {
          todoList[i].task = updatedTask;
          taskText.textContent = updatedTask;
          updateTodoList(todoList);
        }
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        todoList.splice(i, 1);
        updateTodoList(todoList);
        displayTodoList();
      });
  
      todoItem.appendChild(checkbox);
      todoItem.appendChild(taskText);
      todoItem.appendChild(editButton);
      todoItem.appendChild(deleteButton);
  
      todoListContainer.appendChild(todoItem);
    }
  }
  
  // Add a new task to the to-do list
  document.getElementById('add-button').addEventListener('click', function () {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (task) {
      const todoList = getTodoList();
      todoList.push({ task, checked: false });
      updateTodoList(todoList);
      taskInput.value = '';
      displayTodoList();
    }
  });
  
  // Initialize and display the to-do list
  displayTodoList();


// Function to display completed tasks
function displayCompletedTasks() {
    const todoList = getTodoList();
    const completedList = todoList.filter(item => item.checked);
  
    const completedTasksContainer = document.getElementById('completed-list');
    completedTasksContainer.innerHTML = '';
  
    for (let i = 0; i < completedList.length; i++) {
      const task = completedList[i].task;
  
      const completedItem = document.createElement('div');
      completedItem.className = 'completed-item';
  
      const taskText = document.createElement('span');
      taskText.textContent = task;
  
      completedItem.appendChild(taskText);
  
      completedTasksContainer.appendChild(completedItem);
    }
  }
  
  // Move completed tasks to the "Completed Tasks" list
  function moveCompletedTasks() {
    const todoList = getTodoList();
    const completedTasks = todoList.filter(item => item.checked);
    todoList = todoList.filter(item => !item.checked);
  
    updateTodoList(todoList);
    displayTodoList();
  
    const completedTasksContainer = document.getElementById('completed-list');
    completedTasksContainer.innerHTML = '';
  
    for (let i = 0; i < completedTasks.length; i++) {
      completedTasks[i].checked = false;
    }
  
    updateTodoList(todoList.concat(completedTasks));
    displayCompletedTasks();
  }
  
  document.getElementById('done-button').addEventListener('click', moveCompletedTasks);
  
  // Initialize and display the completed tasks
  displayCompletedTasks();
  
// Function to display the "Completed Tasks" section
function displayCompletedSection() {
    displayCompletedTasks();
    displayDeleteCompletedButton();
  }

  // Function to display the "Delete Completed" button
function displayDeleteCompletedButton() {
    const deleteCompletedButton = document.getElementById('delete-completed-button');
    deleteCompletedButton.style.display = 'block';
  }

  // Function to hide the "Delete Completed" button
function hideDeleteCompletedButton() {
    const deleteCompletedButton = document.getElementById('delete-completed-button');
    deleteCompletedButton.style.display = 'none';
  }

  // Function to delete completed tasks from the "Completed Tasks" list
function deleteCompletedTasks() {
    const completedList = getTodoList().filter(item => item.checked === true);
    const todoList = getTodoList().filter(item => item.checked === false);
  
    updateTodoList(todoList);
    displayTodoList();
    hideDeleteCompletedButton();
  }

  document.getElementById('delete-completed-button').addEventListener('click', deleteCompletedTasks);
  displayCompletedSection();
