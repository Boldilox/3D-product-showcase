import React from 'react';

const Thumbnail = ({ items, activeIndex, setActiveIndex }) => (
  <div className="thumbnail">
    {items.map((item, index) => (
      <div
        key={index}
        className={`item ${index === activeIndex ? 'active' : ''}`}
        onClick={() => setActiveIndex(index)}
      >
        <img src={item.imgSrc} alt={`Thumbnail ${index + 1}`} />
        <div className="content">Name Slider</div>
      </div>
    ))}
  </div>
);

export default Thumbnail;
