const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  

let tasks = [];
let nextId = 1;

app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ message: 'Name and description required' });
  
  const task = { id: nextId++, name, description };
  tasks.push(task);
  res.status(201).json(task);
});


app.get('/tasks', (req, res) => res.json(tasks));


app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === +req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});


app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === +req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const { name, description } = req.body;
  task.name = name || task.name;
  task.description = description || task.description;
  res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === +req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send(); 
});


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
