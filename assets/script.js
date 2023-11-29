
let todos = [];

// Select Elements
const todosWrapper = document.querySelector(".todos-wrapper");
const addTodoTitleInput = document.querySelector(".add-todo-title");
const addTodoDescInput = document.querySelector(".add-todo-desc");
const addTodoForm = document.querySelector(".add-todo-wrapper form");
const searchTodoInput = document.querySelector(".search-todos");
const searchTodoForm = document.querySelector(".search-wrapper form");
const filterButtons = document.querySelectorAll(".filter");

// Add Todo
function addTodo(event) {

  if (!addTodoTitleInput.value.trim() && !addTodoDescInput.value.trim()) {
    alert("Nothing to add :\( ");
    return;
  }
  event.preventDefault();

  todos.push({
    id: Date.now(),
    title: addTodoTitleInput.value,
    description: addTodoDescInput.value,
    complete: false,
  });

  renderTodos();

  addTodoTitleInput.value = "";
  addTodoDescInput.value = "";
}

// Delete Todo
function deleteTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  renderTodos();
}
// Toggle Complete
function toggleTodo(id) {
  todos.forEach(function (todo) {
    if (todo.id == id) {
      todo.complete = !todo.complete;
    }
  });



  // filter and render based on the active filter
  const activeFilter = document.querySelector('.filter.active').dataset.filter;
  filterTodos({ target: { dataset: { filter: activeFilter } } });
}

// Filter Todos
function filterTodos(event) {
  const filter = event.target.dataset.filter;

  let filteredTodos;

  switch (filter) {
    case "all":
      filteredTodos = todos;
      break;

    case "unfinished":
      filteredTodos = todos.filter(function (todo) {
        return !todo.complete;
      });
      break;

    case "finished":
      filteredTodos = todos.filter(function (todo) {
        return todo.complete;
      });
      break;
  }

  // Re-render todos
  renderTodos(filteredTodos);
}

// Search Todos
function searchTodos(event) {
  event.preventDefault();
  const query = searchTodoInput.value.trim().toLowerCase();

  const filteredTodos = todos.filter(function (todo) {
    const title = todo.title.toLowerCase();
    const desc = todo.description.toLowerCase();

    return title.includes(query) || desc.includes(query);
  });

  // Re-render todos
  renderTodos(filteredTodos);
}

// Render Todos
function renderTodos(filteredTodos = todos) {
  todosWrapper.innerHTML = "";

  if (filteredTodos.length === 0) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("no-tasks-container"); 
    const image = document.createElement("img");
    image.src = "./assets/img/not_found.png"; 
    image.alt = "No tasks image";
    messageContainer.appendChild(image);

    const message = document.createElement("div");
    message.classList.add("no-tasks");
    message.innerHTML = `<p>No tasks here!</p>`;
    messageContainer.appendChild(message);

    todosWrapper.appendChild(messageContainer);
    return;
  }

  filteredTodos.forEach(function (todo) {
    const checked = todo.complete ? "checked" : "";

    const item = document.createElement("div");
    item.classList.add("todo-item");
    
    item.innerHTML = `
        <div class="todo-title-wrapper">
                <input type="checkbox" ${checked} class="checkbox" title="Click to change status" onclick="toggleTodo(${todo.id})">
                <h4>
                    ${todo.title}
                </h4>
                <p>${todo.description}</p>
           
              <button onclick="deleteTodo(${todo.id})">Remove from list</button>
            
        </div>
    `;
    todosWrapper.appendChild(item);
  });
}

// Event Listeners
addTodoForm.addEventListener("submit", addTodo);
searchTodoForm.addEventListener("submit", searchTodos);
filterButtons.forEach((btn) => btn.addEventListener("click", filterTodos));



// Navbar listener----------------------

document.addEventListener("DOMContentLoaded", function () {
  // Get all filter links
  var filterLinks = document.querySelectorAll(".filter");

  // Add click event listeners to each link
  filterLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Remove active class from all links
      filterLinks.forEach(function (filterLink) {
        filterLink.classList.remove("active");
      });

      // Add active class to the clicked link
      link.classList.add("active");
    });
  });
});