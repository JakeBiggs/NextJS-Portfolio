import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-light-background_secondary dark:bg-dark-background_secondary text-light-text dark:text-dark-text p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">About Me</h2>

                    <p className="text-lg mb-4">
                        I’m a full‑stack software engineer specialising in building modern, reliable applications across the .NET ecosystem. In my current role, I operate as the sole engineer responsible for maintaining, extending, and modernising a legacy insurance platform within a regulated financial environment. This includes everything from deep‑dive debugging and refactoring to designing and delivering full end‑to‑end features that meet insurer and FCA compliance requirements.
                    </p>

                    <p className="text-lg mb-4">
                        Working independently has given me a broad technical remit: backend services, APIs, data‑processing workflows, authentication and IAM (using .NET Identity and Microsoft Entra ID), and full‑stack development with ASP.NET, Blazor, JavaScript (when I have to), and SQL. I’ve also built event‑based auditing systems, sanctions‑checking services, and reusable modelling components for insurance premium calculations. Alongside application development, I handle operational concerns such as logging, validation, DevOps planning, and architectural decision‑making.
                    </p>

                    <p className="text-lg mb-4">
                        My background spans computer science fundamentals, distributed systems, and embedded development. I’ve worked extensively with Python, C++, computer vision (YOLO, OpenCV), and IoT systems using LoRa and ESP32 for designing low‑power, long‑range communication solutions and optimising embedded code for performance and reliability.
                    </p>

                    <p className="text-lg mb-4">
                        Outside my full‑time role, I co‑run Biggs n Bognar Web Agency, where we design and deploy performant web applications for individuals and small businesses with modern, maintainable online platforms.
                    </p>

                    <p className="text-lg mb-4">
                        I also work with embedded systems and IoT, especially LoRa and ESP32, building low power communication systems and optimising code for constrained hardware.
                    </p>

                    <p className="text-lg">
                        When I am not building software, I am usually playing piano or drums, travelling, or experimenting with new home engineering projects.
                    </p>

                </div>

                <div className="md:w-1/3 mt-8 md:mt-0 md:ml-8 flex justify-center">
                    <Image
                        src="/images/portrait_temp.jpg"
                        alt="Portrait"
                        className="rounded-full border-4 border-light-accent dark:border-dark-accent"
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
