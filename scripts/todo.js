// Get the necessary elements
var addButton = document.getElementById('addButton');
var clearButton = document.getElementById('clearButton');
var itemInput = document.getElementById('itemInput');
var todoList = document.getElementById('todoList');

// Add event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);
itemInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    addItem();
  }
});

// Load items from local storage
var todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

// Render the initial list
renderItems();

// Function to add an item to the list
function addItem() {
  var itemText = itemInput.value.trim();

  if (itemText !== '') {
    var newItem = {
      text: itemText,
      completed: false
    };

    todoItems.push(newItem);
    saveItems();
    renderItems();
    itemInput.value = '';
  }
}

// Function to delete an item from the list
function deleteItem(index) {
  todoItems.splice(index, 1);
  saveItems();
  renderItems();
}

// Function to mark an item as completed or not completed
function toggleCompleted(index) {
  todoItems[index].completed = !todoItems[index].completed;
  saveItems();
  renderItems();
}

// Function to clear the entire list
function clearList() {
  todoItems = [];
  saveItems();
  renderItems();
}

// Function to save the items to local storage
function saveItems() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// Function to render the list
function renderItems() {
    todoList.innerHTML = '';
  
    if (todoItems.length === 0) {
      var emptyMessage = document.createElement('li');
      emptyMessage.innerText = 'No items.';
      todoList.appendChild(emptyMessage);
    } else {
      for (var i = 0; i < todoItems.length; i++) {
        var item = todoItems[i];
  
        var listItem = document.createElement('li');
        listItem.classList.add('task-item');
  
        var taskText = document.createElement('div');
        taskText.innerText = item.text;
        taskText.classList.add('task-text');
        listItem.appendChild(taskText);
  
        if (item.completed) {
          listItem.classList.add('completed');
        }
  
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', deleteItem.bind(null, i));
  
        var completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-button');
        completedButton.addEventListener('click', toggleCompleted.bind(null, i));
  
        var iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');
        iconContainer.appendChild(deleteButton);
        iconContainer.appendChild(completedButton);
        listItem.appendChild(iconContainer);
  
        todoList.appendChild(listItem);
      }
    }
  }
  
  
function updateCurrentDateTime() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    const day = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
    const time = currentDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
  
    const dayElement = document.getElementById('day');
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
  
    dayElement.textContent = day;
    dateElement.textContent = formattedDate;
    timeElement.textContent = time;
  }
  
  // Call the updateCurrentDateTime function to display the current date and time
  updateCurrentDateTime();
  setInterval(updateCurrentDateTime, 1000); // Update every second