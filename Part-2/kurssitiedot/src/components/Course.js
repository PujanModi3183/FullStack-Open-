import React from 'react';
import Part from './Part';

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p><strong>Total exercises: {total}</strong></p>
    </div>
  );
};

export default Course;
