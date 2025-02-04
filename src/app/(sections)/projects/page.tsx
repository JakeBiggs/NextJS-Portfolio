"use client";
import React, { useEffect, useState } from 'react';

interface Project {
    title: string;
    description: string;
    url: string;
    git: string;
    skills: string[];
    images: { id: string; url: string; alt: string }[];
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/projects.json')
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error('Error fetching projects:', error));
    }, []);

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js')
            .catch(err => console.error('Error loading Bootstrap JS:', err));
    }, []);

    return (
        <section id="projects" className="bg-gray-900 p-8 text-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-lg mb-4 flex-grow">{project.description}</p>
                            <div id={`carousel-${index}`} className="carousel slide mb-4" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {project.images.map((image, imgIndex) => (
                                        <div key={image.id} className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`}>
                                            <div className="carousel-image-wrapper">
                                                <img src={image.url} className="d-block w-100" alt={image.alt} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${index}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${index}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <a href={project.url} className="text-blue-400 hover:underline mt-4 block">
                                View Project
                            </a>
                            <a href={project.git} className="text-blue-400 hover:underline mt-2 block">
                                Github Page
                            </a>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="badge badge-pill bg-tertiary px-3 py-1 text-sm">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;