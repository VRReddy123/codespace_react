// List Items Input and Display
// Description: Build a component that allows users to enter items into a list. Each new item should be added when the "Add" button is clicked, and displayed on the page.

// Steps:
//     - Write your code within the file, by the name of component as List_Item

import React, { useState } from 'react';

function ListItem() {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem(''); // Clear the input field
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