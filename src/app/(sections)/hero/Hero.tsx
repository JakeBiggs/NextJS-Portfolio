"use client";

import { motion } from "framer-motion";
import FallingPolygons from "@/app/components/FallingPolygons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text overflow-hidden">
            {/* Ensure FallingPolygons is visible behind the content */}
            <div className="absolute inset-0 z-0">
                <FallingPolygons />
            </div>
            <motion.h1 className="md:text-5xl font-bold z-10 ">
                Hey, I&apos;m <span className="text-light-secondary dark:text-dark-secondary">Jacob Biggs</span>
            </motion.h1>
            <p className="text-lg mt-4 max-w-3xl text-light-primary dark:text-dark-primary text-center leading-relaxed lg:whitespace-nowrap z-10 sm:text-wrap md:text-wrap">
                I’m a software developer passionate about building modern web applications and embedded systems.
            </p>
            <motion.a
                href="#projects"
                className="mt-6 px-6 py-3 bg-light-secondary dark:bg-dark-secondary text-light-background dark:text-dark-background rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition backdrop-blur-md bg-opacity-80 shadow-lg z-10"
                whileHover={{ scale: 1.05 }}
            >
                View My Work
            </motion.a>
            <div className="flex justify-center space-x-4 mb-4 mt-8 z-10">
                <a
                    href="https://github.com/JakeBiggs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-secondary dark:text-dark-secondary hover:text-light-accent dark:hover:text-dark-accent transition"
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/jacobjbiggs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-secondary dark:text-dark-secondary hover:text-light-accent dark:hover:text-dark-accent transition"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </section>
    );
}