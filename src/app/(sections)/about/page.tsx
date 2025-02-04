import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-light-background_secondary dark:bg-dark-background_secondary text-light-text dark:text-dark-text p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">About Me</h2>
                    <p className="text-lg mb-4">
                        I am a passionate software developer with experience in building modern web applications using technologies like Next.js, TypeScript, and Tailwind CSS. I love creating sleek and efficient solutions to complex problems.
                    </p>
                    <p className="text-lg mb-4">
                        With a strong background in computer science and a keen eye for design, I strive to build applications that are not only functional but also visually appealing. I am always eager to learn new technologies and improve my skills.
                    </p>
                    <p className="text-lg mb-4">
                        My work with LoRa and ESP32 has allowed me to explore the fascinating world of IoT, where I have designed and implemented systems that require low power consumption and long-range communication. I enjoy the challenge of optimising embedded code to achieve the best performance and reliability.
                    </p>
                    <p className="text-lg mb-4">
                        On the side, I run Biggs n Bognar Web Agency with my friend and colleague Niklas. Together, we provide web development services to individual clients and small businesses, helping them build and maintain their online presence with modern and effective web solutions.
                    </p>
                    <p className="text-lg">
                        When I&apos;m not coding, you can find me exploring new places, playing Piano or Drums, and working on personal projects. I am always open to new opportunities and collaborations.
                    </p>
                </div>
                <div className="md:w-1/3 mt-8 md:mt-0 md:ml-8 flex justify-center">
                    <Image
                        src="/images/portrait.JPG"
                        alt="Portrait"
                        className="rounded-full"
                        width={192}
                        height={192}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;


