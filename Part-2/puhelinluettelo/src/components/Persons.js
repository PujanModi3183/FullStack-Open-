import React from 'react';

const Persons = ({ persons, deletePerson }) => {
  if (!persons || !Array.isArray(persons)) {
    return <p>Loading contacts...</p>;
  }

  return (
    <div>
      {persons.map(person => (
        <p key={person.id}>
          {person.name ? person.name : "Unknown"} {person.number ? person.number : "No number"} 
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
