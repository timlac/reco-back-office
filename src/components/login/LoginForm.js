import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import { signIn } from "../../libs/CognitoConstruct";


const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        newPassword: '', // For new password challenge
    });
    const [newPasswordRequired, setNewPasswordRequired] = useState(false);
    const [user, setUser] = useState(null); // Store the cognitoUser object
    const [error, setError] = useState("")

    const navigate = useNavigate();
    const auth = useAuth();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        const { username, password } = formData;

        try{
            await signIn(username, password)
            auth.login(username); // Update the login context state
            navigate('/protected'); // Navigate to the protected route
        } catch (err) {
            setError(err.message)
        }
    };

    const handleNewPassword = async (event) => {
        event.preventDefault();
        if (!user) {
            console.error('Cognito user is not available.');
            return;
        }
        // Assume cognitoUser is in scope, you'd need to make it accessible here.
        user.completeNewPasswordChallenge(formData.newPassword, {}, {
            onSuccess: (session) => {
                console.log('Password updated successfully!', session);
                setNewPasswordRequired(false);
            },
            onFailure: (err) => {
                console.error('Error updating password:', err);
            },
        });
    };

    return (
        <div>
            {!newPasswordRequired ? (
                // The initial login form
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                // The new password form displayed when the newPasswordRequired challenge is received
                <form onSubmit={handleNewPassword}>
                    <input
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Set New Password</button>
                </form>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginForm