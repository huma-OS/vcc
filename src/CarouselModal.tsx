import React from "react";
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface CarouselModalProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
}

const CarouselModal = ({ images, selectedIndex, onClose }: CarouselModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handleOnChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-modal">
      <button className="close-button" onClick={onClose}></button>
      <div className="carousel-status">
        {`${currentIndex + 1}/${images.length}`}
      </div>
      <Carousel
        selectedItem={selectedIndex}
        showThumbs={false}
        useKeyboardArrows
        showStatus={false}
        onChange={handleOnChange}
      >
        {images.map((imgUrl, index) => (
          <div key={index}>
            <img src={imgUrl} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselModal;
