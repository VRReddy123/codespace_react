// List Items Input and Display
// Description: Build a component that allows users to enter items into a list. Each new item should be added when the "Add" button is clicked, and displayed on the page.

// Steps:
//     - Write your code within the file, by the name of component as List_Item

import React, { useState, useRef, useEffect } from 'react';

function ListItem() {
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const addItem = () => {
        if (newItem.trim() !== '') {
            if (!items.includes(newItem)) {
                setItems([...items, newItem]);
                setNewItem('');
            } else {
                alert('Item already exists!');
            }
        }
    };

    const handleChange = (event) => {
        setNewItem(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={newItem}
                onChange={handleChange}
                placeholder="Enter an item"
                ref={inputRef}
            />
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListItem;