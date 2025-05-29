// Timeout Counter using useEffect
// Description: Create a counter that increments by one every second using the useEffect hook.

// Steps to needed:
//     - setInterval : Repeatedly increments the count every 1 second.
//     - clearInterval(timer) : Clears the timer when component unmounts to prevent memory leaks.
//     - Write your code within the file, by the name of component as Timeout_Counter

import React, { useState, useEffect, useRef } from 'react';

function TimeoutCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true); // Control timer state
  const intervalIdRef = useRef(null); // Store interval ID to avoid stale closures

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    } else if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null; // Clear the ref
    }

    // Cleanup function - runs when unmounting or when isRunning changes
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]); // Run effect when isRunning changes

  const togglePauseResume = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={togglePauseResume}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}

export default TimeoutCounter;