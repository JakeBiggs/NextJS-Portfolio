"use client";
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
    const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        fetch('/projects.json')
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                updateVisibleProjects(data, window.innerWidth);
            })
            .catch((error) => console.error('Error fetching projects:', error));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth !== windowWidth) {
                setWindowWidth(window.innerWidth);
                updateVisibleProjects(projects, window.innerWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [projects, windowWidth]);

    useEffect(() => {
        setIsMounted(true);
        setWindowWidth(window.innerWidth);
    }, []);

    const updateVisibleProjects = (projects: Project[], width: number) => {
        const isMobile = width < 768;
        const numberOfProjects = isMobile ? 4 : 6;
        setVisibleProjects(projects.slice(0, numberOfProjects));
    };

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

    const handleViewMore = () => {
        setShowAll(true);
        setVisibleProjects(projects);
    };

    const handleViewLess = () => {
        setShowAll(false);
        updateVisibleProjects(projects, windowWidth);
    };

    return (
        <section id="projects" className="bg-light-background_tertiary dark:bg-dark-background_tertiary p-8 text-light-text dark:text-dark-text">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleProjects.map((project, index) => (
                        <div key={index} className="bg-light-background_secondary dark:bg-dark-background_secondary p-4 rounded-lg shadow-lg flex flex-col cursor-pointer" onClick={() => handleProjectClick(project)}>
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <Carousel id={`carousel-${index}`} className="mb-4" onClick={stopPropagation} interval={null}>
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
                                    <span key={skillIndex} className="badge bg-light-accent dark:bg-slate-600 px-3 py-1 text-sm">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    {isMounted && !showAll && projects.length > (windowWidth < 768 ? 4 : 6) && (
                        <button className="bg-light-secondary dark:bg-dark-secondary text-light-background dark:text-dark-background px-4 py-2 rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition" onClick={handleViewMore}>
                            View More
                        </button>
                    )}
                    {showAll && (
                        <button className="bg-light-secondary dark:bg-dark-secondary text-light-background dark:text-dark-background px-4 py-2 rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition" onClick={handleViewLess}>
                            View Less
                        </button>
                    )}
                </div>
            </div>

            {showModal && selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-light-background_tertiary dark:bg-dark-background_tertiary rounded-lg shadow-lg p-6 w-full max-w-3xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                            <button className="text-white" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="mb-4">
                            <p>{selectedProject.description}</p>
                        </div>
                        <Carousel id={`carousel-modal`} className="mb-4" interval={null}>
                            {selectedProject.images.map((image, imgIndex) => (
                                <Carousel.Item key={image.id} className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`}>
                                    <div className="carousel-image-wrapper">
                                        <Image src={image.url} className="d-block w-100" alt={image.alt} layout="fill" objectFit="cover" />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <a href={selectedProject.git} className="text-light-secondary dark:text-dark-secondary hover:text-light-accent dark:hover:text-dark-accent mt-2 block">
                            <FontAwesomeIcon icon={faGithub} size="2x" />
                        </a>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {selectedProject.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="badge bg-light-accent dark:bg-slate-600 px-3 py-1 text-sm">{skill}</span>
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