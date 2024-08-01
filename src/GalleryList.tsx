import React from "react";

interface GallerySlide {
  imgUrl: string;
  id: number;
}

interface GalleryListProps {
  gallerySlides: GallerySlide[];
  onImageClick: (index: number) => void;
}

// const GalleryList = ({ gallerySlides }: { gallerySlides: GallerySlide[] }) => {
const GalleryList: React.FC<GalleryListProps> = ({ gallerySlides, onImageClick }) => {
  return ( 
    <>
      {/* {gallerySlides.map((gallerySlide) => ( */}
      {gallerySlides.map((gallerySlide, index) => (
         <li className="slide-model-links" key={gallerySlide.id} onClick={() => onImageClick(index)}>
         <div className="slide-model slide-shadow slide-model-photo">
           <figure className="slide-model-elements">
             {/* <img className="slide-model-element-img slide-model-element-img-photo" src={gallerySlide.imgUrl} alt="version one" /> */}
             <img className="slide-model-element-img slide-model-element-img-photo" src={gallerySlide.imgUrl} alt={`Slide ${gallerySlide.id}`} />
           </figure>
         </div>
       </li>
      ))}
    </>
   );
}
 
export default GalleryList;