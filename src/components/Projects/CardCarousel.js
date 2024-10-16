import React, { useEffect, useState } from 'react';
import './Slide.css'; // Ensure to create this file for styles

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardItems = [
    {
      id: 1,
      title: 'Stacked Card Carousel',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla.',
    },
    {
      id: 2,
      title: 'Second Item',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      title: 'A Third Card',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla.',
    },
    {
      id: 4,
      title: 'Fourth',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {cardItems.map((card, index) => (
          <div
            key={card.id}
            className={`card ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'prev' : ''} ${index > currentIndex ? 'next' : ''}`}
            style={{ zIndex: cardItems.length - Math.abs(currentIndex - index) }} // Dynamic z-index
            onClick={() => handleCardClick(index)} // Update currentIndex on click
          >
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
