import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-light-background_secondary dark:bg-dark-background_secondary text-light-text dark:text-dark-text p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">About Me</h2>

                    <p className="text-lg mb-4">
                        I’m a full-stack software developer specialising in building modern, reliable applications across the .NET ecosystem. In my current role, I work in a small, fast-moving InsurTech team where I handle everything from debugging legacy systems to designing and delivering full end-to-end features.
                    </p>

                    <p className="text-lg mb-4">
                        Alongside application development, I’m involved in broader technical operations; networking, server management, and long-term architectural planning, which gives me a practical understanding of how systems behave in real-world environments.
                    </p>

                    <p className="text-lg mb-4">
                        I bring a strong background in computer science, as well as experience with modern front-end technologies like TypeScript, Next.js, and Tailwind CSS. This combination helps me build applications that feel clean, intuitive, and visually refined, even within the .NET stack.
                    </p>

                    <p className="text-lg mb-4">
                        I’ve also worked extensively with LoRa and ESP32, building low-power, long-range IoT systems and optimising embedded code for reliability and performance. I enjoy the challenge of solving problems across both software and hardware layers.
                    </p>

                    <p className="text-lg mb-4">
                        Outside of my full-time role, I run Biggs n Bognar Web Agency with my colleague and co-founder. We help individuals and small businesses modernise their online presence through bespoke, performant web applications and ongoing technical support.
                    </p>

                    <p className="text-lg">
                        When I&apos;m not coding, you can usually find me playing piano or drums, travelling, or building personal projects. I’m always open to new opportunities and collaborations.
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
