"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    <Link className="no-underline text-gray-800 dark:text-gray-200" href="/">My Portfolio</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-800 dark:text-gray-200 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
                <div className={`md:flex items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <Link href="#about" className="block mt-4 md:inline-block md:mt-0 text-gray-800 dark:text-gray-200 mr-4 no-underline hover:text-light-secondary dark:hover:text-dark-secondary transition duration-300">
                        About
                    </Link>
                    <Link href="#projects" className="block mt-4 md:inline-block md:mt-0 text-gray-800 dark:text-gray-200 mr-4 no-underline hover:text-light-secondary dark:hover:text-dark-secondary transition duration-300">
                        Projects
                    </Link>
                    <Link href="#contact" className="block mt-4 md:inline-block md:mt-0 text-gray-800 dark:text-gray-200 no-underline hover:text-light-secondary dark:hover:text-dark-secondary transition duration-300">
                        Contact
                    </Link>
                </div>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
