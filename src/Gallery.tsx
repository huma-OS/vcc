import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchItems from "./useFetchItems";
import GalleryList from "./GalleryList";
interface GallerySlide {
  category?: string;
  title: string;
  imgUrl: string;
  id: number;
}

const Gallery = () => {
  const { category } = useParams<{ category: string }>();
  const endpoint = 'http://localhost:8000/items';
  // const [category, setCategory] = useState<string | null>(null);

  const filterFn = (items: GallerySlide[]) => {
    return items.filter(item => item.category === category);
    // const nonHomeSlides = items.filter(item => item.category !== 'HOME');
    // console.log(nonHomeSlides);
    // if (nonHomeSlides.length > 0) {
    //   setCategory(nonHomeSlides[0].category || '');
    // }
    // return nonHomeSlides;
  };

  const { items: gallerySlides, isPending, error } = useFetchItems(endpoint, filterFn);

  return (  
    <>
    {category &&  (
        <h2 className="titles-title">{category}</h2>
      )}
    {/* {category && category !== 'HOME' && (
        <h2 className="titles-title">{category}</h2>
      )} */}
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
  <GalleryList gallerySlides={gallerySlides} />
)}
      {/* {gallerySlides && <GalleryList gallerySlides={gallerySlides} />} */}
      {/* <GalleryList gallerySlides={gallerySlides.filter((gallerySlide) => gallerySlide.title === 'PHOTOGRAPHY' )} /> */}
    </ul>
    </>
  );
}
 
export default Gallery;