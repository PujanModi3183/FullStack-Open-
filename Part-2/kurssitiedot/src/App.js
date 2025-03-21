import React from 'react';
import Course from './components/Course';

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        { id: 1, name: 'Fundamentals of React', exercises: 10 },
        { id: 2, name: 'Using props to pass data', exercises: 7 },
        { id: 3, name: 'State of a component', exercises: 14 },
        { id: 4, name: 'Redux', exercises: 11 }
      ]
    },
    {
      id: 2,
      name: 'Node.js Basics',
      parts: [
        { id: 1, name: 'Routing', exercises: 6 },
        { id: 2, name: 'Middleware', exercises: 8 }
      ]
    }
  ];

  return (
    <div>
      <h1>Course Information</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
