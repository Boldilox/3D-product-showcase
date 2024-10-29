import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { imgSrc: 'images/canbg.png', title: 'Product 1', description: 'Description 1' },
    { imgSrc: 'images/image2.jpg', title: 'Product 2', description: 'Description 2' },
    { imgSrc: 'images/image3.jpg', title: 'Product 3', description: 'Description 3' },
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="list">
        {items.map((item, index) => (
          <div key={index} className={`item ${index === activeIndex ? 'active' : ''}`}>
            <img src={item.imgSrc} alt={item.title} />
            <div className="content">
              <p>Design</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
      <Thumbnail items={items} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
};

export default Slider;
