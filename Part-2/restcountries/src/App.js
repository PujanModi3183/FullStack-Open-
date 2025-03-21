import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch country data from API
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  // Filter countries based on search input
  const filteredCountries = filter.length === 0 
    ? countries 
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h1>Country Finder</h1>
      <Search filter={filter} setFilter={setFilter} />

      {filter.length > 0 && filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryList countries={filteredCountries} setSelectedCountry={setSelectedCountry} />
      )}
    </div>
  );
};

export default App;
