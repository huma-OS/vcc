import React from "react";

interface GallerySlide {
  imgUrl: string;
  id: number;
}

const GalleryList = ({ gallerySlides }: { gallerySlides: GallerySlide[] }) => {
  return ( 
    <>
      {gallerySlides.map((gallerySlide) => (
         <li className="slide-model-links" key={gallerySlide.id}>
         <div className="slide-model slide-shadow slide-model-photo">
           <figure className="slide-model-elements">
             <img className="slide-model-element-img slide-model-element-img-photo" src={gallerySlide.imgUrl} alt="version one" />
           </figure>
         </div>
       </li>
      ))}
    </>
   );
}
 
export default GalleryList;