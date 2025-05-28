// Simple Form Submission
// Description: Create a simple form with a name input field and a submit button. Display an alert with the name when the form is submitted.

// Steps:
//     - onSubmit: Calls handleSubmit , which prevents the default form submission action and shows an alert.
//     - Write your code within the file, by the name of component as Simple_Form

import React, { useState } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default SimpleForm;