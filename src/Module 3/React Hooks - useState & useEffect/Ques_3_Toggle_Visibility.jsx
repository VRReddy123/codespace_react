// Toggle Visibility

// 1. Goal: Toggle the visibility of a text message.
// 2. Steps:
//     - Use useState to create a isVisible state with an initial value of false .
//     - Display a button that toggles the boolean isVisible state.
//     - Conditionally render a message when isVisible is true.
//     - Write your code within the file, by the name of component as Toggle_Visibility

import React, { useState } from 'react';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    try {
      setIsVisible(!isVisible);
    } catch (error) {
      console.error("Error toggling visibility:", error);  // Log the error
      // Optionally, display an error message to the user.  For a very basic implementation:
      alert("An error occurred while toggling visibility.");
    }
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide Text' : 'Show Text'}
      </button>
      {isVisible && <p>This text is visible.</p>}
    </div>
  );
}

export default ToggleVisibility;