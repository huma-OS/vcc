import React, { useState, useEffect } from "react";
import GalleryList from "./GalleryList";
interface GallerySlide {
  title: string;
  imgUrl: string;
  id: number;
}

const Gallery = () => {
  const [gallerySlides, setGallerySlides ] = useState<GallerySlide[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/videography')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setGallerySlides(data);
        setIsPending(false);
      })
    }, 5000)
  }, []);
  return (  
    <>
    {/* <h2 className="titles-title">PHOTOGRAPHY</h2> */}
    <ul className="slide-models slide-models-photo gallery">
               
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
  <GalleryList gallerySlides={gallerySlides} />
)}
      {/* {gallerySlides && <GalleryList gallerySlides={gallerySlides} />} */}
      {/* <GalleryList gallerySlides={gallerySlides.filter((gallerySlide) => gallerySlide.title === 'PHOTOGRAPHY' )} /> */}
    </ul>
    </>
  );
}
 
export default Gallery;