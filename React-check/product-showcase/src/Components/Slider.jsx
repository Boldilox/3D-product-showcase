import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);

  // Hardcoded background images
  const backgrounds = [
    'images/canbg.png',
    'images/image2.jpg',
    'images/image3.jpg',
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    // Fetch only product name and description from the API
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > backgrounds.length) {
          console.warn('More products than backgrounds. Some slides will reuse images.');
        }
        setItems(data);
      });
  }, []); // Fetch data only once on mount

  useEffect(() => {
    // Start the auto-slide only after items are loaded
    if (items.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [items]); // Depend on items so it only starts after data loads

  if (items.length === 0) return <div>Loading...</div>; // Prevent loading errors

  return (
    <div className="slider">
      <div className="list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`item ${index === activeIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${backgrounds[index % backgrounds.length]})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="content">
              <p>Design</p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
      <Thumbnail activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
};

export default Slider;
