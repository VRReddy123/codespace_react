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
const PostList = React.memo(({ posts, error }) => (
    <>
        <h2>Posts</h2>
        {error ? (
            <p style={{ color: 'red' }}>Error fetching posts: {error.message}</p>
        ) : posts.length === 0 ? (
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
    const [postsError, setPostsError] = useState(null); // separate error for posts

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`HTTP error fetching users! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                alert(`Error fetching users: ${error.message}`); // User notification
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Fetch posts when selectedUserId changes
    useEffect(() => {
        if (!selectedUserId) {
            setPosts([]); // Clear posts if no user is selected
            setPostsError(null);
            return; // **Important**: Skip the fetch if there's no selected user
        }

        const fetchPosts = async () => {
            setLoading(true);
            setPostsError(null); // reset posts error
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error fetching posts! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                alert(`Error fetching posts: ${error.message}`);
                setPostsError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [selectedUserId]);

    const handleUserClick = useCallback((userId) => {
        setSelectedUserId(userId);
    }, [setSelectedUserId]); //Ensure `handleUserClick` captures the latest state

    return (
        <div>
            <h2>Users</h2>
            <UserList users={users} handleUserClick={handleUserClick} />
            <PostList posts={posts} error={postsError} />
        </div>
    );
}

export default DependentAPICall;