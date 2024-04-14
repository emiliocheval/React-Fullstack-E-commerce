import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Contact.css';

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [confirmation, setConfirmation] = useState(null);

    const onSubmit = async (data, e) => {
        try {
            const response = await fetch('http://localhost:3001/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {

                setConfirmation('Message Sent!');

                console.log('Message sent:', data);

                reset();
            } else {

                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);

            setConfirmation('Failed to send message. Please try again later.');
        }
    };




    useEffect(() => {
        if (confirmation) {
            const timerId = setTimeout(() => {
                setConfirmation(null);
            }, 5000);

            return () => clearTimeout(timerId);
        }
    }, [confirmation]);

    return (
        <div className='contact-container'>
            <h1 className='contact-title'>Contact Us</h1>
            <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
                <label className='contact-label'>
                    Namn:
                    <input
                        type='text'
                        name='name'
                        {...register('name', {
                            required: 'Namn är obligatoriskt',
                            minLength: {
                                value: 2,
                                message: 'This field should contain at least 2 characters'
                            }
                        })}
                        className='contact-input'
                    />
                    {errors.name && <p className='contact-error'>{errors.name.message}</p>}
                </label>
                <label className='contact-label'>
                    E-postadress:
                    <input
                        type='email'
                        name='email'
                        {...register('email', { required: 'This field is required and should be a valid email adress' })}
                        className='contact-input'
                    />
                    {errors.email && <p className='contact-error'>{errors.email.message}</p>}
                </label>
                <label className='contact-label'>
                    Meddelande:
                    <textarea
                        name='message'
                        {...register('message', { required: 'This field is required' })}
                        className='contact-input'
                    />
                    {errors.message && <p className='contact-error'>{errors.message.message}</p>}
                </label>
                <button type='submit' className='contact-button'>SEND</button>
                {confirmation && (
                    <div className='confirmation-message'>
                        <p>{confirmation}</p>
                    </div>
                )}
            </form>

        </div>
    );
};

export default Contact;
