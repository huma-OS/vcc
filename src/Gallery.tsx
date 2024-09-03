import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchItems from "./useFetchItems";
import GalleryList from "./GalleryList";
import CarouselModal from "./CarouselModal";
import VideoModal from "./VideoModal";
import PlaceholderImage from "./PlaceholderImage";

interface GallerySlide {
  category?: string;
  title: string;
  imgUrl: string;
  imgUrlWebp: string;
  id: number;
  url?: string;
  videoUrl?: string;
}

const Gallery: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const endpoint = 'https://gist.githubusercontent.com/huma-OS/b3de1ec34662bb077ba2b6b83eccd780/raw/1b48eabaf138731d856a01a1db996990dc1e4128/items.json';
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null); 
  const [isGalleryVisible, setIsGalleryVisible] = useState(true);


  const filterFn = (items: GallerySlide[]) => {
    return items.filter(item => item.category === category);
  };

  const { items: gallerySlides, isPending, error } = useFetchItems(endpoint, filterFn);

  const handleImageClick = (index: number) => {
    if (category === "videography") {
      setSelectedVideoIndex(index);
    } else {
    setSelectedImageIndex(index);
  }
  setIsGalleryVisible(false);
};

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setSelectedVideoIndex(null);
    setIsGalleryVisible(true);
  }

  return (  
    <>
    {category &&  (
        <h2 className="titles-title">{category.replace(/-/g, ' ')}</h2>
      )}

{selectedImageIndex !== null && category !== "videography" && category !== "web-development" &&(
        <CarouselModal
          images={gallerySlides.map(slide => slide.imgUrl)}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseModal}
        />
      )}

{selectedVideoIndex !== null && category === "videography" && gallerySlides[selectedVideoIndex].videoUrl && (
  <VideoModal
    videoUrl={gallerySlides[selectedVideoIndex].videoUrl!}
    onClose={handleCloseModal}
  />
)}

{isGalleryVisible && (
  <ul className={`slide-models slide-models-photo gallery ${isGalleryVisible ? '' : 'hidden'}`}>
  {error && <div>{ error }</div>}         
{isPending ? (
<>
{[...Array(5)].map((_, index) => (
    <li className="slide-model-links" key={index}>
    <div className="slide-model slide-shadow slide-model-photo">
      <figure className="slide-model-elements card loading">
        {/* <img className="slide-model-element-img slide-model-element-img-photo image" alt="" /> */}
        <PlaceholderImage />
      </figure>
    </div>
  </li>
  ))}
</>
) : (
<GalleryList gallerySlides={gallerySlides} onImageClick={handleImageClick} />
)}
</ul>
)}
    
    </>
  );
}
 
export default Gallery;