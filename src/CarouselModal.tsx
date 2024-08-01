import React from "react";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

interface CarouselModalProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
}

const CarouselModal: React.FC<CarouselModalProps> = ({images, selectedIndex, onClose}) => {
  return ( 
    <div className="carousel-modal">
    <button className="close-button" onClick={onClose}>X</button>
    <Carousel selectedItem={selectedIndex} showThumbs={false} useKeyboardArrows>
      {images.map((imgUrl, index) => (
        <div key={index}>
          <img src={imgUrl} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  </div>
   );
}
 
export default CarouselModal;