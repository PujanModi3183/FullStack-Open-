import React from 'react';

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p><strong>Votes: {votes}</strong></p>
    </div>
  );
};

export default Anecdote;
