// Simple Form Submission
// Description: Create a simple form with a name input field and a submit button. Display an alert with the name when the form is submitted.

// Steps:
//     - onSubmit: Calls handleSubmit , which prevents the default form submission action and shows an alert.
//     - Write your code within the file, by the name of component as Simple_Form

import React, { useState } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');
  const [error, setError] = useState(''); // New state for error message

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === '') {
      setError('Name field cannot be empty.');
      return;
    }

    setError(''); // Clear any previous error
    alert(`You entered: ${name}`);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default SimpleForm;