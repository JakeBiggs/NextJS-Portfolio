import React from 'react';

const projects = [
    {
        title: 'Project One',
        description: 'A web application built with Next.js and Tailwind CSS.',
        link: '#',
    },
    {
        title: 'Project Two',
        description: 'A mobile app developed using React Native and TypeScript.',
        link: '#',
    },
    {
        title: 'Project Three',
        description: 'An e-commerce platform created with Node.js and Express.',
        link: '#',
    },
];

const Projects: React.FC = () => {
    return (
        <section id="projects" className="bg-gray-900 p-8 text-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-lg mb-4">{project.description}</p>
                            <a href={project.link} className="text-blue-400 hover:underline">
                                View Project
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;