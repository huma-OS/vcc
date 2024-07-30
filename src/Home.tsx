import React from "react";
import useFetchItems from "./useFetchItems";
import { Link } from "react-router-dom";
interface HomeSlide {
  category: string;
  title: string;
  url: string;
  imgUrl: string;
  id: number;
}

const Home: React.FC = () => {
  const endpoint = 'http://localhost:8000/items';
  const filterFn = (items: HomeSlide[]) => items.filter(item => item.category === 'HOME');
  const { items: homeSlides, isPending, error } = useFetchItems<HomeSlide>(endpoint, filterFn);

return (
<ul className="slide-models gallery">
{isPending ? (
<>
{[...Array(4)].map((_, index) => (
    <li className="slide-model-links" key={index}>
    <div className="slide-model slide-shadow">
      <figure className="slide-model-elements card loading">
        <img className="slide-model-element-img image" alt="" />
      </figure>
    </div>
  </li> 
))}
  </>
  ) : error ?  (
    <div>{ error }</div>
) : (
  homeSlides.map((homeSlide) => (

      <li className="slide-model-links" key={homeSlide.id}>
    <Link to={homeSlide.url} className="slide-model slide-shadow">
      <figure className="slide-model-elements">
        <img className="slide-model-element-img portrait" src={homeSlide.imgUrl} alt="version one" />
        <figcaption className="slide-model-element-copy">
          <p className="slide-model-element-copy">{homeSlide.title}</p>
        </figcaption>
      </figure>
    </Link>
  </li>
  ))
)}
</ul>


);
}

export default Home;