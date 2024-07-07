import React from 'react';
import { useInView } from 'react-intersection-observer';
import ReactTooltip from 'react-tooltip';
import '../../styles/projects.css';

import image1 from '../../assets/image1.jpg'
import image2 from '../../assets/image2.jpg'
import image3 from '../../assets/image3.jpg'
import image4 from '../../assets/image4.jpg'
import image5 from '../../assets/image5.jpg'
import image6 from '../../assets/image6.jpg'
import image7 from '../../assets/image7.jpg'
import image8 from '../../assets/image8.jpg'
import image9 from '../../assets/image9.png'
import image10 from '../../assets/image10.jpg'


const projectImages = [
    { src: image1, title: 'פרויקט 1' },
    { src: image2, title: 'פרויקט 2' },
    { src: image3, title: 'פרויקט 3' },
    { src: image4, title: 'פרויקט 4' },
    { src: image5, title: 'פרויקט 5' },
    { src: image6, title: 'פרויקט 6' },
    { src: image7, title: 'פרויקט 7' },
    { src: image8, title: 'פרויקט 8' },
    { src: image9, title: 'פרויקט 9' },
    { src: image10, title: 'פרויקט 10' },
];

const Projects = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <div className="projects-container">
            {projectImages.map((image, index) => (
                <div
                    key={index}
                    className={`project-item ${inView ? 'visible' : ''}`}
                    ref={ref}
                >
                    <img src={image.src} alt={image.title} />
                    <div className="tooltip">{image.title}</div>
                </div>
            ))}
        </div>
    );
};

export default Projects;
