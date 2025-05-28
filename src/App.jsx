import './App.css'
import React, { useState } from 'react';
function App() {

  return (
    <>
      {/* Add your component here */

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}}
export default Counter;
  
    </>
  )
}

export default App
