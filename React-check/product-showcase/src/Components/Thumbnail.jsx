import React from 'react';

const Thumbnail = ({ activeIndex, setActiveIndex }) => {
  // Hardcoded thumbnails
  const thumbnails = [
    { imgSrc: 'images/canbg.png', title: 'Product 1' },
    { imgSrc: 'images/image2.jpg', title: 'Product 2' },
    { imgSrc: 'images/image3.jpg', title: 'Product 3' },
  ];

  return (
    <div className="thumbnail">
      {thumbnails.map((thumbnail, index) => (
        <div
          key={index}
          className={`item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => setActiveIndex(index)}
        >
          <img src={thumbnail.imgSrc} alt={thumbnail.title} />
          <div className="content">{thumbnail.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
