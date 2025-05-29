// Window Width

// 1. Goal: Track and display the window width as the window resizes.
// 2. Steps:
//     - Use useEffect to add an event listener for the window resize event.
//     - Use useState to store the current window width.
//     - Update the width state whenever the window is resized and display it.
//     - Write your code within the file, by the name of component as Window_Width

import React, { useState, useEffect, useCallback, useRef } from 'react';

function WindowWidth() {
    const [windowWidth, setWindowWidth] = useState(0); // Initialize to 0 or a default value

    // Use useRef to hold the debounce timer ID
    const debounceTimer = useRef(null);

    const debouncedSetWindowWidth = useCallback(
        (width) => {
            // Clear any existing timer
            clearTimeout(debounceTimer.current);

            // Set a new timer
            debounceTimer.current = setTimeout(() => {
                setWindowWidth(width);
            }, 200); // Adjust delay as needed (e.g., 200ms)
        },
        [] // Dependency array is empty - the debounced function does not depend on any state
    );

    useEffect(() => {
        // Check if 'window' is defined (client-side rendering)
        if (typeof window === 'undefined') {
            console.warn("Component is running in a non-browser environment (e.g., server-side).");
            return; // Skip adding the event listener
        }

        const handleResize = () => {
            debouncedSetWindowWidth(window.innerWidth);
        };

        // Add event listener on mount
        window.addEventListener('resize', handleResize);

        // Remove event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(debounceTimer.current); // Clear the timer on unmount
        };
    }, [debouncedSetWindowWidth]);

    return (
        <div>
            {typeof window === 'undefined' ? (
                <p>Window width is not available in this environment.</p>
            ) : (
                <h2>Window Width: {windowWidth} px</h2>
            )}
        </div>
    );
}

export default WindowWidth;