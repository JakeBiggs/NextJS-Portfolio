import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link href="/">My Portfolio</Link>
                </div>
                <div className="space-x-4">
                    <Link href="#about" className="text-gray-300 hover:text-white">About</Link>
                    <Link href="#projects" className="text-gray-300 hover:text-white">Projects</Link>
                    <Link href="#contact" className="text-gray-300 hover:text-white">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;