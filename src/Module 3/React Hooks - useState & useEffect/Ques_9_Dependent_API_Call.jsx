// Dependent API Calls with useEffect
// Description: Create a component that displays a list of users. When a user is clicked, fetch and display their posts.

// Steps to needed:
//     - First useEffect : Fetches the user list.
//     - Second useEffect([selectedUserId]) : Fetches posts when a user is selected.
//     - Write your code within the file, by the name of component as Dependent_API_Call

import React, { useState, useEffect, useCallback } from 'react';

// Presentation Component: User List
const UserList = React.memo(({ users, handleUserClick }) => (
    <ul>
        {users.map(user => (
            <li key={user.id} onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer' }}>
                {user.name}
            </li>
        ))}
    </ul>
));

// Presentation Component: Post List
const PostList = React.memo(({ posts }) => (
    <>
        <h2>Posts</h2>
        {posts.length === 0 ? (
            <p>No posts for selected user.</p>
        ) : (
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        )}
    </>
));

function DependentAPICall() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Fetch posts when selectedUserId changes
    useEffect(() => {
        if (selectedUserId) {
            const fetchPosts = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setPosts(data);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPosts();
        } else {
            setPosts([]); // Clear posts if no user is selected
        }
    }, [selectedUserId]);

    const handleUserClick = useCallback((userId) => {
        setSelectedUserId(userId);
    }, [setSelectedUserId]); //Ensure `handleUserClick` captures the latest state

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Users</h2>
            <UserList users={users} handleUserClick={handleUserClick} />
            <PostList posts={posts} />
        </div>
    );
}

export default DependentAPICall;