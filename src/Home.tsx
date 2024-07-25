import React, { useState, useEffect } from "react";
interface HomeSlide {
  title: string;
  url: string;
  imgUrl: string;
  id: number;
}

const Home = () => {
const [homeSlides, setHomeSlides] = useState<HomeSlide[]>([]);
const [isPending, setIsPending] = useState<boolean>(true);

useEffect(() => {
  setTimeout(() => {
    fetch('http://localhost:8000/home')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setHomeSlides(data);
      setIsPending(false);
    });
  }, 5000)
}, []);

return (
<div className="slide-models gallery">
{isPending ? (
<>
{[...Array(4)].map((_, index) => (
    <div className="slide-model-links" key={index}>
    <div className="slide-model slide-shadow">
      <figure className="slide-model-elements card loading">
        <img className="slide-model-element-img image" alt="" />
      </figure>
    </div>
  </div> 
))}
  </>
) : (
  homeSlides.map((homeSlide) => (
    <a href={homeSlide.url} className="slide-model-links" key={homeSlide.id}>
    <div className="slide-model slide-shadow">
      <figure className="slide-model-elements">
        <img className="slide-model-element-img portrait" src={homeSlide.imgUrl} alt="version one" />
        <figcaption className="slide-model-element-copy">
          <p className="slide-model-element-copy">{homeSlide.title}</p>
        </figcaption>
      </figure>
    </div>
  </a>
  ))
)}
</div>


);
}

export default Home;