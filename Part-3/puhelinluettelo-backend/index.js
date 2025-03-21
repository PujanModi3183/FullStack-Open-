require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors()); // 🟢 Ensures frontend can access backend
app.use(morgan('tiny'));

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" }
];

// 🟢 GET all contacts
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// 🟢 GET a specific contact
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

// 🔴 DELETE a contact
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

// 🟢 POST a new contact
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  if (persons.some(person => person.name === name)) {
    return res.status(400).json({ error: "Name already exists" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000),
    name,
    number
  };

  persons.push(newPerson);
  res.json(newPerson);
});

// 🟢 Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
