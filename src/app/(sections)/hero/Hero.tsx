"use client";

import { motion } from "framer-motion";
import FallingPolygons from "@/app/components/FallingPolygons";

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text overflow-hidden">
            <FallingPolygons />
            <motion.h1 className="text-5xl font-bold">
                Hey, I&apos;m <span className="text-light-secondary dark:text-dark-secondary">Jacob Biggs</span>
            </motion.h1>
            <p className="text-lg mt-4 max-w-2xl text-light-primary dark:text-dark-primary">
                I’m a software developer passionate about building modern web applications.
            </p>
            <motion.a
                href="#projects"
                className="mt-6 px-6 py-3 bg-light-secondary dark:bg-dark-secondary text-light-background dark:text-dark-background rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition backdrop-blur-md bg-opacity-80 shadow-lg"
                whileHover={{ scale: 1.05 }}
            >
                View My Work
            </motion.a>
        </section>
    );
}