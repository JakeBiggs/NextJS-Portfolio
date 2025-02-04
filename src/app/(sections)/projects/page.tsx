"use client";
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';

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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('/projects.json')
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error('Error fetching projects:', error));
    }, []);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <section id="projects" className="bg-gray-900 p-8 text-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col cursor-pointer" onClick={() => handleProjectClick(project)}>
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <Carousel id={`carousel-${index}`} className="mb-4" onClick={stopPropagation}>
                                {project.images.map((image, imgIndex) => (
                                    <Carousel.Item key={image.id} className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`}>
                                        <div className="carousel-image-wrapper">
                                            <Image src={image.url} className="d-block w-100" alt={image.alt} layout="fill" objectFit="cover" />
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="badge badge-pill bg-tertiary px-3 py-1 text-sm">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                            <button className="text-white" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="mb-4">
                            <p>{selectedProject.description}</p>
                        </div>
                        <Carousel id={`carousel-modal`} className="mb-4">
                            {selectedProject.images.map((image, imgIndex) => (
                                <Carousel.Item key={image.id} className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`}>
                                    <div className="carousel-image-wrapper">
                                        <Image src={image.url} className="d-block w-100" alt={image.alt} layout="fill" objectFit="cover" />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <a href={selectedProject.url} className="text-blue-400 hover:underline mt-4 block">
                            View Project
                        </a>
                        <a href={selectedProject.git} className="text-blue-400 hover:underline mt-2 block">
                            Github Page
                        </a>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {selectedProject.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="badge badge-pill bg-tertiary px-3 py-1 text-sm">{skill}</span>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;