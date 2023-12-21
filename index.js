const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory tasks array
let tasks = [];

// Render the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint to get tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// API endpoint to add a task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  tasks.push({ id: tasks.length + 1, task, completed: false });
  res.json(tasks);
});

// API endpoint to mark a task as completed
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
  );
  res.json(tasks);
});

// API endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json(tasks);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
