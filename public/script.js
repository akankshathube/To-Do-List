async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const response = await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: taskInput.value }),
  });

  const tasks = await response.json();

  renderTasks(tasks);
  taskInput.value = "";
}

async function toggleTask(id) {
  const response = await fetch(`/tasks/${id}`, {
    method: "PUT",
  });

  const tasks = await response.json();

  renderTasks(tasks);
}

async function deleteTask(id) {
  const response = await fetch(`/tasks/${id}`, {
    method: "DELETE",
  });

  const tasks = await response.json();

  renderTasks(tasks);
}

function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.task;

    const buttonToggle = document.createElement("button");
    buttonToggle.textContent = task.completed ? "Undo" : "Complete";
    buttonToggle.onclick = () => toggleTask(task.id);

    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(buttonToggle);
    li.appendChild(buttonDelete);

    taskList.appendChild(li);
  });
}

async function fetchTasks() {
  const response = await fetch("/tasks");
  const tasks = await response.json();
  renderTasks(tasks);
}

// Fetch tasks on page load
fetchTasks();
