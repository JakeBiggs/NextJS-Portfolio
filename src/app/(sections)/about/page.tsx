import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-gray-800 p-8 text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">About Me</h2>
                    <p className="text-lg mb-4">
                        I am a passionate software developer with experience in building modern web applications using technologies like Next.js, TypeScript, and Tailwind CSS. I love creating sleek and efficient solutions to complex problems.
                    </p>
                    <p className="text-lg mb-4">
                        With a strong background in computer science and a keen eye for design, I strive to build applications that are not only functional but also visually appealing. I am always eager to learn new technologies and improve my skills.
                    </p>
                    <p className="text-lg">
                        When I&apos;m not coding, you can find me exploring new places, reading tech blogs, or working on personal projects. I am always open to new opportunities and collaborations.
                    </p>
                </div>
                <div className="md:w-1/3 mt-8 md:mt-0 md:ml-8 flex justify-center">
                    <Image src="/images/portrait.JPG" alt="Portrait" className="rounded-full" width={192} height={192} objectFit="cover" />
                </div>
            </div>
        </section>
    );
};

export default About;