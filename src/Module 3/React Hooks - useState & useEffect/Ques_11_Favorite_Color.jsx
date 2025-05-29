// Favorite Color

// 1. Goal: Allow users to input and display their favorite color.
// 2. Steps:
//     - Create a state variable favoriteColor with an initial value of an empty string.
//     - Implement an input field to update favoriteColor using onChange .
//     - Display the value of favoriteColor below the input field.
//     - Write your code within the file, by the name of component as Timeout_Counter

import React, { useState } from 'react';

function FavoriteColor() {
    const [color, setColor] = useState('');

    const handleChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <div>
            <label htmlFor="colorInput">Enter your favorite color:</label>
            <input
                type="text"
                id="colorInput"
                value={color}
                onChange={handleChange}
            />
            {color && <p>Your favorite color is: <span style={{ color }}>{color}</span></p>}
        </div>
    );
}

export default FavoriteColor;