import React, { useEffect, useState } from "react";

const WebDevAfrica: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data
    const endpoint =
      'https://gist.githubusercontent.com/huma-OS/43c02bc3d7642f4fb65f87e2c45264db/raw/eb6eb6f5e1dc9c8d4ebdd9fd5f27c2df94d799e4/africa.json';

    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => setCities(data));
  }, []);

  useEffect(() => {
    if (query) {
      const regex = new RegExp(query, 'gi');
      const matchArray = cities.filter(place =>
        place.city.match(regex) || place.country.match(regex)
      );
      setFilteredCities(matchArray);
    } else {
      setFilteredCities([]);
    }
  }, [query, cities]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  return ( 
    <>
    <div className="tech-stack-icons web-dev-icons">
            {/* Tech Stack Icons */}
            <img
              className="tech-icon"
              src="/img/icons/react.svg"
              alt="React"
            />
            <img
              className="tech-icon"
              src="/img/icons/typescript.svg"
              alt="TypeScript"
            />
            <img
              className="tech-icon"
              src="/img/icons/NPM.svg"
              alt="npm"
            />
             <img
              className="tech-icon"
              src="/img/icons/git.svg"
              alt="git"
            />
             <img
              className="tech-icon"
              src="/img/icons/github.svg"
              alt="github"
            />
            {/* Add more icons here */}
          </div>
          <form className="search-form">
      <input
        type="text"
        className="search"
        placeholder="African City or Country"
        value={query}
        onChange={handleInputChange}
      />
      <ul className="suggestions">
        {filteredCities.map((place, index) => {
          const regex = new RegExp(query, 'gi');
          const cityName = place.city.replace(regex, `<span class="hl">${query}</span>`);
          const countryName = place.country.replace(regex, `<span class="hl">${query}</span>`);
          return (
            <li key={index}>
              <div className="name" dangerouslySetInnerHTML={{ __html: `${cityName}, ${countryName}` }}></div>
              <div className="population">Population: {place.population}</div>
              <div className="population">Language: {place.language}</div>
              <div className="population">GDP: {place.gdp}</div>
              <div className="population">Size: {place.size}</div>
            </li>
          );
        })}
      </ul>
    </form>
    </>
    
   );
}
 
export default WebDevAfrica;