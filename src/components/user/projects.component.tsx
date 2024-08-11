import { useInView } from 'react-intersection-observer';
import '../../styles/projects.style.css';
import '../../styles/global.css';


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
    { src: image1, title: 'אדריכלות נחלה במושב השבעה' },
    { src: image2, title: 'עיצוב פנים לוילה בקיסריה' },
    { src: image3, title: 'עיצוב פנים באלקנה' },
    { src: image4, title: 'אדריכלות מושב מבקיעים' },
    { src: image5, title: 'אדריכלות ועיצוב פנים למשפחה בשדרות' },
    { src: image6, title: 'אדריכלות מושב שיבולים' },
    { src: image7, title: 'פנטהוז בהרצליה' },
    { src: image8, title: 'פנטהוז עם נוף לים בהרצליה' },
    { src: image9, title: 'וילה בסביון' },
    { src: image10, title: 'אדריכלות ועיצוב פנים עבור מבנה בפלמחים' },
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
