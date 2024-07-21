import React from "react";

const Home = () => {
return (
<div className="slide-models gallery">
  <a href="/video" className="slide-model-links">
    {/*
    <!-- <div className="slide-model slide-shadow">
          <figure className="slide-model-elements">
            <img className="slide-model-element-img" src="img/0907-MW-OD-ROW-06.jpeg" alt="image version one">
            <figcaption className="slide-model-element-copy">
              <p>VIDEO</p>
            </figcaption>
          </figure>
        </div> --> */}
    <div className="slide-model slide-shadow">
      <figure className="slide-model-elements card loading">
        <img className="slide-model-element-img image" alt="" />
      </figure>
    </div>
  </a>
  <a href="/photography" className="slide-model-links">
    <div className="slide-model slide-shadow">
      <figure className="slide-model-elements">
        <img className="slide-model-element-img portrait" src="img/0907-MW-OD-ROW-02-L.jpeg" alt="version one" />
        <figcaption className="slide-model-element-copy">
          <p className="slide-model-element-copy">PHOTOGRAPHY</p>
        </figcaption>
      </figure>
    </div>
    {/*
    <!-- <div className="slide-model slide-shadow">
          <figure className="slide-model-elements card loading">
            <img className="slide-model-element-img portrait image">
          </figure>
        </div> --> */}
  </a>
  <a href="/art-direction" className="slide-model-links">
    <div className="slide-model slide-shadow">
      <figure className="slide-model-elements">
        <img className="slide-model-element-img" src="img/0907-MW-OD-ROW-06.jpeg" alt="version one" />
        <figcaption className="slide-model-element-copy">
          <p>ART DIRECTION & DESIGN</p>
        </figcaption>
      </figure>
    </div>
  </a>
  <a href="/web-development" className="slide-model-links">
    <div className="slide-model slide-shadow">
      <figure className="slide-model-elements">
        <img className="slide-model-element-img portrait" src="img/0907-MW-OD-ROW-02-L.jpeg" alt="version one" />
        <figcaption className="slide-model-element-copy">
          <p className="slide-model-element-copy">WEB DEVELOPMENT</p>
        </figcaption>
      </figure>
    </div>
  </a>
</div>


);
}

export default Home;