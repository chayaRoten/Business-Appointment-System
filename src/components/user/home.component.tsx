import  React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import '../../styles/global.css';


import  image1 from'../../assets/image1.jpg'
import  image2 from'../../assets/image2.jpg'
import  image3 from'../../assets/image3.jpg'
import  image4 from'../../assets/image4.jpg'
import  image5 from'../../assets/image5.jpg'
import  image6 from'../../assets/image6.jpg'
import  image7 from'../../assets/image7.jpg'
import  image8 from'../../assets/image8.jpg'
import  image9 from'../../assets/image9.png'
import  image10 from'../../assets/image10.jpg'


const images = [
  { src: image1, text: 'אדריכלות נחלה במושב השבעה' },
  { src: image2, text: 'עיצוב פנים לוילה בקיסריה' },
  { src: image3, text: 'עיצוב פנים באלקנה' },
  { src: image4, text: 'אדריכלות מושב מבקיעים' },
  { src: image5, text: 'אדריכלות ועיצוב פנים למשפחה בשדרות' },
  { src: image6, text: 'אדריכלות מושב שיבולים' },
  { src: image7, text: 'פנטהוז בהרצליה' },
  { src: image8, text: 'פנטהוז עם נוף לים בהרצליה' },
  { src: image9, text: 'וילה בסביון' },
  { src: image10, text: 'אדריכלות ועיצוב פנים עבור מבנה בפלמחים' },
];


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeIn} 1s ease-in-out;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Text = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  border-radius: 50%;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ArrowLeft = styled(Arrow)`
  left: 10px;
`;

const ArrowRight = styled(Arrow)`
  right: 10px;
`;
export const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
  };


    return <div>
      <Container>
      <ArrowLeft onClick={goToPrevious}>{'<'}</ArrowLeft>
      <ArrowRight onClick={goToNext}>{'>'}</ArrowRight>
      {images.map((image, index) => (
        <React.Fragment key={index}>
          {index === currentIndex && (
            <>
              <Image src={image.src} alt={image.text} />
              <Text>{image.text}</Text>
            </>
          )}
        </React.Fragment>
      ))}
    </Container>
    </div>
}