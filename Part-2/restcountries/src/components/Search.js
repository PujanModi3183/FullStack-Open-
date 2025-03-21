import React from 'react';

const Search = ({ filter, setFilter }) => {
  return (
    <div>
      Find countries: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default Search;
