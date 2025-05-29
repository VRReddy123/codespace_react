// Document Title Update

// 1. Goal: Change the document title to reflect the number of button clicks.
// 2. Steps:
//     - Initialize a count state using useState .
//     - Use useEffect to update the document title whenever the count changes.
//     - Create a button to increase the count and see the document title change.
//     - Write your code within the file, by the name of component as Title_Update

import React, { useState, useEffect } from 'react';

const MAX_COUNT = 100; // Define a maximum count

function TitleUpdate() {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        document.title = `Clicked ${clickCount} times`;
    }, [clickCount]);

    const handleClick = () => {
        setClickCount((prevCount) =>
            prevCount < MAX_COUNT ? prevCount + 1 : prevCount
        );
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}

export default TitleUpdate;