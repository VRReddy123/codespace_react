// Local Storage with useEffect and useState
// Description: Create a component where the user's input is saved in local storage and persists after page reload.

// Steps to needed:
//     - useState(() => {...}) : Initializes the input with local storage value.
//     - useEffect([input]) : Updates local storage each time input changes.
//     - Write your code within the file, by the name of component as Local_Storage.

import React, { useState, useEffect } from 'react';

function LocalStorage() {
    const [text, setText] = useState(() => {
        // Initialize state from local storage
        const storedValue = localStorage.getItem('myText');
        return storedValue || ''; // Default to empty string if nothing is stored
    });

    useEffect(() => {
        // Update local storage whenever 'text' changes
        localStorage.setItem('myText', text);
    }, [text]);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <label htmlFor="textInput">Enter Text:</label>
            <input
                type="text"
                id="textInput"
                value={text}
                onChange={handleChange}
            />
            <p>You entered: {text}</p>
        </div>
    );
}

export default LocalStorage;