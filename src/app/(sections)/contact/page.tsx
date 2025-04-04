"use client";

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


declare global {
    interface Window {
        grecaptcha: {
            enterprise: {
                ready: (callback: () => void) => void;
                execute: (siteKey: string, options: { action: string }) => Promise<string>;
            };
        };
    }
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        // Initialize EmailJS with your public key
        emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

        // Load reCAPTCHA script dynamically
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.head.removeChild(script);
        };
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Execute reCAPTCHA and get the token
        window.grecaptcha.enterprise.ready(async () => {
            const token = await window.grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'submit' });

            if (!token) {
                alert('Please complete the reCAPTCHA.');
                return;
            }

            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                'g-recaptcha-response': token,
            };

            emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams
            )
                .then((result) => {
                    console.log('Email sent successfully:', result.text);
                    alert('Email sent successfully!');
                    setFormData({ name: '', email: '', message: '' });
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    alert('Error sending email. Please try again later.');
                });
        });
    };

    return (
        <section id="contact" className="bg-light-background_secondary dark:bg-dark-background_secondary p-8 text-light-text dark:text-dark-text">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-4">Contact</h2>
                <p className="text-lg mb-4">
                    If you would like to get in touch, feel free to send me an email or connect with me on GitHub and LinkedIn.
                </p>
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="mailto:JakeJBiggs1@gmail.com" className="text-light-secondary  hover:underline">
                        <FontAwesomeIcon icon={faEnvelope} size="2x" />
                    </a>
                    <a href="https://github.com/JakeBiggs" target="_blank" rel="noopener noreferrer" className="text-light-secondary  hover:underline">
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>
                    <a href="hhttps://www.linkedin.com/in/jacobjbiggs/" target="_blank" rel="noopener noreferrer" className="text-light-secondary hover:underline">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                </div>
                <form className="bg-light-background dark:bg-dark-background_tertiary p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-2 rounded-lg bg-light-background_tertiary dark:bg-gray-700 text-light-text dark:text-dark-text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 rounded-lg bg-light-background_tertiary dark:bg-gray-700 text-light-text dark:text-dark-text"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-lg mb-2">Message:</label>
                        <textarea
                            id="message"
                            className="w-full p-2 rounded-lg bg-light-background_tertiary dark:bg-gray-700 text-light-text dark:text-dark-text"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary  text-white rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent">Send</button>
                </form>
            </div >
        </section >
    );
};

export default Contact;