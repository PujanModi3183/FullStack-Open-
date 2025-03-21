import React from 'react';

const CountryList = ({ countries, setSelectedCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
