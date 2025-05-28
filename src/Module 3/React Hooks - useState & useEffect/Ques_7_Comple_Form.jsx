// Form with Multiple Input Fields
// Description: Create a form for user registration with fields for username, email, and password. Display the entered data under the form.


// Steps:
//     - Write your code within the file, by the name of component as Complex_Form

import React, { useState, useCallback } from 'react';

function CompleteForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({  // Separate state for error messages
        email: '',
        password: '',
    });

    // Debounced input handler
    const debouncedHandleChange = useCallback((event) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'email') {
            validateEmail(value);
        }

        if (name === 'password') {
            validatePassword(value);
        }

    }, []);  // useCallback's dependency array - empty since no external variables are used

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData); // Or display however you prefer
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email format' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, email: '' })); // Clear error
        }
    };

    // Password validation function (simple example)
    const validatePassword = (password) => {
        if (password.length < 8) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'Password must be at least 8 characters' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, password: '' }));  // Clear error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={debouncedHandleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={debouncedHandleChange}
                    required
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}  {/* Email error display */}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={debouncedHandleChange}
                    required
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}  {/* Password error display */}

                <button type="submit">Register</button>
            </form>

            <div>
                <h2>Entered Data:</h2>
                <p>Username: {formData.username}</p>
                <p>Email: {formData.email}</p>
                <p>Password: {formData.password}</p>
            </div>
        </div>
    );
}

export default CompleteForm;