// Fetch Data with useEffect
// Description: Create a component that fetches data from an API and displays it in a list using the useEffect hook.

// Steps:
//     - Write your code within the file, by the name of component as Fetch_Data

import React, { useState, useEffect, useCallback, useMemo } from 'react';

function FetchData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoize the fetchData function to prevent unnecessary re-creation
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies: fetchData remains constant

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Dependency array includes the memoized fetchData function

    // Memoize the list rendering to prevent unnecessary re-renders
    const memoizedList = useMemo(() => {
        return (
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        );
    }, [data]); // Only re-render if the data changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return memoizedList; // Return the memoized list
}

export default FetchData;