import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';

function LoginSignup() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (isSignup) {

            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            });

            if (response.status === 201) {
                const result = await response.json();
                console.log(result);

                navigate('/login');
            } else if (response.status === 400) {

                console.error('Bad request');
            } else {

                console.error('Registration failed');
            }
        } else {

            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            if (response.status === 200) {
                const result = await response.json();
                const token = result.token;
                console.log(token);

                localStorage.setItem('token', token);

                navigate('/');
            } else if (response.status === 400) {

                console.error('Bad request');
            } else if (response.status === 401) {

                console.error('Unauthorized');
            } else {

                console.error('Login failed');
            }
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="loginsignup-fields">
                    {isSignup && (
                        <input name="name" {...register('name', { required: true })} placeholder="Your Name" />
                    )}
                    {errors.name && <p>This field is required</p>}

                    <input name="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email Address" />
                    {errors.email && <p>This field is required and should be a valid email address</p>}

                    <input name="password" {...register('password', { required: true, minLength: 6 })} type="password" placeholder="Password" />
                    {errors.password && <p>This field is required and should have at least 6 characters</p>}

                    {isSignup && (
                        <input name="repeatPassword" {...register('repeatPassword', {
                            required: true,
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { password } = getValues();
                                    return password === value || "Passwords should match!";
                                }
                            }
                        })} type="password" placeholder="Repeat Password" />
                    )}
                    {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

                    <button type="submit" className="loginsignup-container button">{isSignup ? 'Sign Up' : 'Login'}</button>
                </form>
                <button onClick={() => setIsSignup(!isSignup)} className='loginsignup-login'>
                    {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                </button>
            </div>
        </div>
    );
}

export default LoginSignup;