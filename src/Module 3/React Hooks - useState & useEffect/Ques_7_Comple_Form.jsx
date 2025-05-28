// Form with Multiple Input Fields
// Description: Create a form for user registration with fields for username, email, and password. Display the entered data under the form.


// Steps:
//     - Write your code within the file, by the name of component as Complex_Form

import React, { useState } from 'react';

function CompleteForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData); // Or display however you prefer
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
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

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