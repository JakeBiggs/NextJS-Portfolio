"use client";

import { motion } from "framer-motion";
import FallingPolygons from "@/app/components/FallingPolygons";

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-[#1A1A2E] text-white overflow-hidden">
            <FallingPolygons />
            <motion.h1 className="text-5xl font-bold">
                Hey, I&apos;m <span className="text-[#00ADB5]">Jacob Biggs</span>
            </motion.h1>
            <p className="text-lg mt-4 max-w-2xl text-[#EAEAEA]">
                I’m a software developer passionate about building modern web applications.
            </p>
            <motion.a
                href="#projects"
                className="mt-6 px-6 py-3 bg-[#00ADB5] text-[#1A1A2E] rounded-lg hover:bg-[#393E46] transition backdrop-blur-md bg-opacity-80 shadow-lg"
                whileHover={{ scale: 1.05 }}
            >
                View My Work
            </motion.a>
        </section>
    );
}