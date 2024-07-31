import React from "react";

const About = () => {
  return ( 
    <>
    <h2 className="titles-title">ABOUT ME</h2>
      <div className="slide-models about about-content-wrapper">
        <div className="slide-model slide-shadow vid">
          <figure className="slide-model-elements about-model-element">
            <img
              className="slide-model-element-img portrait about-me"
              src="img/IMG_3840.jpg"
              alt="version one"
            />
          </figure>
        </div>
        <div className="about-texts">
          <p className="about-text">
            I’m Okoth, a British-born, Kenyan-raised creative based in London. My diverse experiences across three continents have given me a unique perspective and voice that shape my work.
          </p>
          <p className="about-text"><b>My Journey</b></p>
          <p className="about-text">
            I started my career in the US, working as a carpenter and honing my culinary skills under a private chef. Later, I transitioned into the wedding industry, managing gift lists and logistics, which refined my project management skills.
          </p>
          <p className="about-text"><b>Professional Experience</b></p>
          <p className="about-text">
            I've worked as a Frontend Software Engineer and Team Lead for Web Content with international e-commerce giants. My roles involved managing multiple projects, leading teams of web content administrators, software engineers, sub-editors, and designers, and delivering data-driven insights using tools like Google Analytics and Google Tag Manager.
          </p>
          <p className="about-text"><b>Creative Work</b></p>
          <p className="about-text">
            In visual communications, I’ve done photography, design, and art direction for numerous independent brands. I've filmed events such as brand launches, gallery openings, and weddings in London and abroad, combining technical ability with project management skills.
          </p>
          <p className="about-text"><b>My Philosophy</b></p>
          <p className="about-text">
            I’m dedicated to creativity, technical excellence, and effective communication. Whether collaborating on design mock-ups or leading cross-functional teams, I aim to deliver quality and strategic insight. I’m passionate about leveraging my diverse experiences to contribute to the success of my clients and projects.
          </p>
          <p className="about-text">Let’s connect and create something exceptional together.</p>
        </div>
      </div>
      </>
   );
}
 
export default About;