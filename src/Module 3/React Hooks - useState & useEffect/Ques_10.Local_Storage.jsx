// Local Storage with useEffect and useState
// Description: Create a component where the user's input is saved in local storage and persists after page reload.

// Steps to needed:
//     - useState(() => {...}) : Initializes the input with local storage value.
//     - useEffect([input]) : Updates local storage each time input changes.
//     - Write your code within the file, by the name of component as Local_Storage.

import React, { useState, useEffect, useCallback, useRef } from 'react';

function LocalStorage() {
    const [text, setText] = useState(() => {
        try {
            const storedValue = localStorage.getItem('myText');
            return storedValue || '';
        } catch (error) {
            console.error("Error accessing local storage:", error);
            alert("Error accessing local storage. Your input may not be saved.");
            return ''; // Provide a default value in case of error
        }
    });

    const debouncedSetText = useRef(null);

    useEffect(() => {
        debouncedSetText.current = (value) => {
            try {
                localStorage.setItem('myText', value);
            } catch (error) {
                console.error("Error setting local storage:", error);
                alert("Error writing to local storage. Your input may not be saved.");
            }
        };
    }, [])

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleChange = (event) => {
        const newText = event.target.value;
        const debouncedFunc = debounce(() => {
            debouncedSetText.current(newText);
        }, 300);
        setText(newText);
        debouncedFunc();
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