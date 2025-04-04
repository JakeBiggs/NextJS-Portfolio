import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-light-secondary dark:bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-center space-x-4">
                <a href="https://github.com/JakeBiggs" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/jacobjbiggs/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;