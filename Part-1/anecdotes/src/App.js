import React, { useState } from 'react';
import Button from './components/Button';
import Anecdote from './components/Anecdote';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Vote" handleClick={handleVote} />
      <Button text="Next Anecdote" handleClick={handleNext} />

      <h2>Top Voted Anecdote</h2>
      {votes[mostVotedIndex] > 0 ? (
        <Anecdote text={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]} />
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;
