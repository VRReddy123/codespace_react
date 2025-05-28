// List Items Input and Display
// Description: Build a component that allows users to enter items into a list. Each new item should be added when the "Add" button is clicked, and displayed on the page.

// Steps:
//     - Write your code within the file, by the name of component as List_Item

import React, { useState, useRef, useEffect } from 'react';

function ListItem() {
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState(new Set());
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const addItem = () => {
        if (newItem.trim() !== '') {
            if (!items.has(newItem)) {
                setItems(new Set([...items, newItem]));
                setNewItem('');
            } else {
                alert('Item already exists!');
            }
        }
    };

    const handleChange = (event) => {
        if (event.target.value.length <= 20 && /^[a-zA-Z0-9\s]*$/.test(event.target.value)) {
            setNewItem(event.target.value);
        } else {
            alert("Input must be under 20 characters and alphanumeric only.");
        }
    };

    // Function to generate a simple unique ID (not cryptographically strong)
    const generateId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    return (
        <div>
            <input
                type="text"
                value={newItem}
                onChange={handleChange}
                placeholder="Enter an item"
                ref={inputRef}
                maxLength="20"
            />
            <button onClick={addItem}>Add</button>
            <ul>
                {Array.from(items).map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListItem;