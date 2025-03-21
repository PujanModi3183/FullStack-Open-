require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// 🟢 Connect to MongoDB
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 🟢 Define Mongoose Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

// 🟢 GET all contacts from MongoDB
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => res.status(500).json({ error: "Failed to fetch contacts" }));
});

// 🟢 GET a specific contact from MongoDB
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch(error => res.status(400).json({ error: "Invalid ID format" }));
});

// 🔴 DELETE a contact from MongoDB
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => res.status(500).json({ error: "Failed to delete contact" }));
});

// 🟢 POST a new contact to MongoDB
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  // Check for duplicate name in database
  Person.findOne({ name }).then(existingPerson => {
    if (existingPerson) {
      return res.status(400).json({ error: "Name already exists" });
    }

    const newPerson = new Person({ name, number });
    newPerson.save()
      .then(savedPerson => res.json(savedPerson))
      .catch(error => res.status(500).json({ error: "Failed to save contact" }));
  });
});

// 🟢 Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
