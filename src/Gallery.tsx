import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchItems from "./useFetchItems";
import GalleryList from "./GalleryList";
import CarouselModal from "./CarouselModal";
interface GallerySlide {
  category?: string;
  title: string;
  imgUrl: string;
  id: number;
  url?: string;
}

const Gallery: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const endpoint = 'http://localhost:8000/items';
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filterFn = (items: GallerySlide[]) => {
    return items.filter(item => item.category === category);
  };

  const { items: gallerySlides, isPending, error } = useFetchItems(endpoint, filterFn);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    console.log(`Image Clicked: ${index}`);
  }

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  }

  return (  
    <>
    {category &&  (
        <h2 className="titles-title">{category.replace(/-/g, ' ')}</h2>
      )}

{selectedImageIndex !== null && category !== "web-development" &&(
        <CarouselModal
          images={gallerySlides.map(slide => slide.imgUrl)}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseModal}
        />
      )}
    <ul className="slide-models slide-models-photo gallery">
      {error && <div>{ error }</div>}         
   {isPending ? (
    <>
    {[...Array(5)].map((_, index) => (
        <li className="slide-model-links" key={index}>
        <div className="slide-model slide-shadow slide-model-photo">
          <figure className="slide-model-elements card loading">
            <img className="slide-model-element-img slide-model-element-img-photo image" alt="" />
          </figure>
        </div>
      </li>
      ))}
  </>
) : (
  <GalleryList gallerySlides={gallerySlides} onImageClick={handleImageClick} />
)}
    </ul>
    </>
  );
}
 
export default Gallery;