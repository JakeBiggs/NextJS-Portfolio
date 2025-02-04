"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Position {
    top: string;
    left: string;
}

const generatePositions = (): Position[] => {
    return Array.from({ length: 50 }, () => ({
        top: `-${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
    }));
};

const FallingPolygons: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        setPositions(generatePositions());
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {positions.map((pos, index) => (
                <motion.div
                    key={index}
                    className="absolute bg-[#00ADB5] bg-opacity-20 w-8 h-8 md:w-16 md:h-16"
                    style={{
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        top: pos.top,
                        left: pos.left,
                    }}
                    initial={{ y: 0, rotate: 0 }} // Start at the initial top position
                    animate={{ y: '200vh', rotate: index % 2 === 0 ? 360 : -360 }} // Animate to far below the viewport
                    transition={{
                        duration: 20 + index * 2, // Different duration for each polygon
                        repeat: Infinity,
                        ease: 'linear',
                        rotate: {
                            duration: 10 + index * 2, // Different rotation speed for each polygon
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                />
            ))}
        </div>
    );
};

export default FallingPolygons;