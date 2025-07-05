const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("toggle-theme");
const clearBtn = document.querySelector(".clear-btn");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">✅</button>
        <button onclick="deleteTodo(${index})">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(text) {
  todos.push({ text, completed: false });
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text !== "") {
    addTodo(text);
    todoInput.value = "";
  }
});
clearBtn.addEventListener("click", () => {
    todos.length = 0;
    renderTodos();
})
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  themeToggle.style.color = document.body.classList.contains("dark") ? "white" : "black";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
    themeToggle.style.color = "white";
  }
}

loadTheme();
renderTodos();
