import React from "react";
import { Link } from "react-router-dom"

interface GallerySlide {
  category?: string;
  title: string;
  imgUrl: string;
  imgUrlWebp: string;
  id: number;
  url?: string;
  videoUrl?: string;
}

interface GalleryListProps {
  gallerySlides: GallerySlide[];
  onImageClick: (index: number) => void;
}

// const GalleryList = ({ gallerySlides }: { gallerySlides: GallerySlide[] }) => {
const GalleryList: React.FC<GalleryListProps> = ({ gallerySlides, onImageClick }) => {
  return ( 
    <>
      {gallerySlides.map((gallerySlide, index) => (
  gallerySlide.category === "web-development" ? (
    <li className="slide-model-links" key={gallerySlide.id}>
      {gallerySlide.title === "BILITANONNE" ? (
        <a 
          href="https://www.bilitanonne.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="slide-model slide-shadow slide-model-photo"
        >
          <figure className="slide-model-elements">
            <picture>
              <source 
                srcSet={`${gallerySlide.imgUrlWebp} 480w, ${gallerySlide.imgUrlWebp} 800w, ${gallerySlide.imgUrlWebp} 1200w`} 
                type="image/webp" 
                sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
              />
              <source 
                srcSet={`${gallerySlide.imgUrl} 480w, ${gallerySlide.imgUrl} 800w, ${gallerySlide.imgUrl} 1200w`}  
                sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
              />
              <img 
                className="slide-model-element-img slide-model-element-img-photo" 
                src={gallerySlide.imgUrl} 
                alt={`Slide ${gallerySlide.id}`} 
                loading="lazy" 
              />
            </picture>
            <figcaption className="slide-model-element-copy">
              <p className="slide-model-element-copy">{gallerySlide.title}</p>
            </figcaption>
          </figure>
        </a>
      ) : (
        <Link to={gallerySlide.url!} className="slide-model-links">
          <div className="slide-model slide-shadow slide-model-photo">
            <figure className="slide-model-elements">
              <picture>
                <source 
                  srcSet={`${gallerySlide.imgUrlWebp} 480w, ${gallerySlide.imgUrlWebp} 800w, ${gallerySlide.imgUrlWebp} 1200w`} 
                  type="image/webp" 
                  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
                />
                <source 
                  srcSet={`${gallerySlide.imgUrl} 480w, ${gallerySlide.imgUrl} 800w, ${gallerySlide.imgUrl} 1200w`}  
                  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
                />
                <img 
                  className="slide-model-element-img slide-model-element-img-photo" 
                  src={gallerySlide.imgUrl} 
                  alt={`Slide ${gallerySlide.id}`} 
                  loading="lazy" 
                />
              </picture>
              <figcaption className="slide-model-element-copy">
                <p className="slide-model-element-copy">{gallerySlide.title}</p>
              </figcaption>
            </figure>
          </div>
        </Link>
      )}
    </li>
  ) : (
    <li className="slide-model-links" key={gallerySlide.id} onClick={() => onImageClick(index)}>
      <div className="slide-model slide-shadow slide-model-photo">
        <figure className="slide-model-elements">
          <picture>
            <source 
              srcSet={`${gallerySlide.imgUrlWebp} 480w, ${gallerySlide.imgUrlWebp} 800w, ${gallerySlide.imgUrlWebp} 1200w`} 
              type="image/webp" 
              sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            />
            <source 
              srcSet={`${gallerySlide.imgUrl} 480w, ${gallerySlide.imgUrl} 800w, ${gallerySlide.imgUrl} 1200w`}  
              sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            />
            <img 
              className="slide-model-element-img slide-model-element-img-photo" 
              src={gallerySlide.imgUrl} 
              alt={`Slide ${gallerySlide.id}`} 
              loading="lazy" 
            />
          </picture>
        </figure>
      </div>
    </li>
  )
))}

    </>
   );
}
 
export default GalleryList;