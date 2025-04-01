const mongoose = require('mongoose');

// Get password from command-line arguments
const password = process.argv[2];

if (!password) {
  console.log('  Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const url = `mongodb+srv://pujanmodi96:modipujan@cluster0.8qm8h.mongodb.net/phonebook?retryWrites=true&w=majority`;


mongoose.connect(url)
  .then(() => console.log(' Connected to MongoDB'))
  .catch(err => console.log(' Connection error:', err));

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);


if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log(' Phonebook:');
    result.forEach(person => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}


if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(() => {
    console.log(` Added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
