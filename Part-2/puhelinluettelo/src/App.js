import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // 🟢 Fetch contacts from backend when the app loads
  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  // 🟢 Add a new contact
  const addPerson = (event) => {
    event.preventDefault();

    // Check for duplicate names
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    // Save to backend
    axios.post('http://localhost:3001/api/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      });
  };

  // 🟢 Delete a contact
  const deletePerson = (id) => {
    if (window.confirm('Do you really want to delete this contact?')) {
      axios.delete(`http://localhost:3001/api/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  // Filter contacts
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      
      <h2>Add a new contact</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
