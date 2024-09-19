import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
interface LatLng {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: '100%',
  height: '100vh'
}

interface City {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  population?: string | number;
  language?: string[];
  known_for?: string;
  major_export?: string;
  independence_day?: string;
  gdp?: string;
  size?: string;
}

const WebDevAfrica: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<Partial<City> | null>(null);;
  const [mapCenter, setMapCenter] = useState<LatLng>({ lat: 0, lng: 20 });
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [mapZoom, setMapZoom] = useState<number>(3);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  useEffect(() => {
    const handleResize = () => {
      // Detect if the screen is mobile or desktop
      if (window.innerWidth < 768) {
        // Mobile values
        setMapCenter({ lat: -90, lng: 25 });
        setMapZoom(2);
      } else {
        // Desktop values
        setMapCenter({ lat: 10, lng: 20 });
        setMapZoom(3);
      }
    };

    // Set initial values based on current screen size
    handleResize();

    // Add resize event listener to handle screen changes
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch data
    const endpoint = process.env.REACT_APP_AFRICA_API_ENDPOINT;

    if(endpoint) {
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => setCities(data))
      .catch(err => console.error("Error fetching data:", err));
    } else {
      console.error("API endpoint is not defined in environment variables");
    }
  }, []);

  useEffect(() => {
    if (query) {
      const regex = new RegExp(query, 'gi');
      const matchArray = cities.filter((place) =>
        place.city.match(regex) || place.country.match(regex)
      );
      setFilteredCities(matchArray);

      if (!matchArray.length) {
        // No match, zoom to Africa
        setMapCenter({ lat: 0, lng: 20 });
        setMapZoom(3);
      } else if (matchArray.length === 1) {
        const place = matchArray[0];

        if (place.country.toLowerCase() === query.toLowerCase()) {
          // Exact match for a country, zoom out to show the whole country
          setMapCenter({ lat: place.latitude, lng: place.longitude });
          setMapZoom(5); // Adjust zoom for country level
        } else {
          // Exact match for a city, zoom into the city
          setMapCenter({ lat: place.latitude, lng: place.longitude });
          setMapZoom(10); // City zoom level
        }
      } else {
        // Multiple matches, zoom out to Africa
        setMapCenter({ lat: 0, lng: 20 });
        setMapZoom(3);
      }
    } else {
      setFilteredCities([]);
      setMapCenter({ lat: 0, lng: 20 }); // Reset zoom to Africa view
      setMapZoom(3);
    }
  }, [query, cities]);

  useEffect(() => {
    if (query && !filteredCities.length) {
      const geocode = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
          );
          const data = await response.json();
          if (data.status === "OK" && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setMapCenter({ lat: location.lat, lng: location.lng });
            setMapZoom(10);
            setSelectedCity({
              city: data.results[0].address_components[0]?.long_name || 'Unknown City', // You can adjust this based on the structure of the results
              country: data.results[0].address_components.find((comp: any) => comp.types.includes("country"))?.long_name || 'Unknown Country',
              latitude: location.lat ?? 0, // Ensure latitude is a number
              longitude: location.lng ?? 0, // Ensure longitude is a number
              population: '', // Or undefined if not available
              language: [],
              known_for: '',
              major_export: '',
              independence_day: '',
              gdp: '',
              size: '',
            });
          } else {
            console.warn("No geocoding results found for the query");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
        }
      };
      geocode();
    }
  }, [query, filteredCities, apiKey]);
  
 // Function to handle "Enter" key press
 const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (filteredCities.length === 1) {
      const place = filteredCities[0];
      if (place.country.toLowerCase() === query.toLowerCase()) {
        setMapCenter({ lat: place.latitude, lng: place.longitude });
        setMapZoom(5); // Adjust based on the country size
      } else {
        setMapCenter({ lat: place.latitude, lng: place.longitude });
        setMapZoom(10); // City zoom level
      }
      setSelectedCity(place);
    }
  }
};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setQuery(inputValue);
    setExpandedItems([]); // Collapse all items when typing

    if (inputValue.trim() === '') {
      // If the input is cleared, show the entire Africa map
      setMapCenter({ lat: 0, lng: 20 });
      setMapZoom(3); // Zoom out to show Africa
      setFilteredCities([]);
      setSelectedCity(null); // Reset selected city when input is cleared
    }
  };

  const handleItemClick = (item: City, index: number, isCapitalClick?: boolean) => {
    // Set the selected city or country
    setSelectedCity(item);
  
    // Determine if the item is a city or country and adjust the map settings
    if (isCapitalClick || item.city.toLowerCase() === query.toLowerCase()) {
      // Handle city click
      setMapCenter({ lat: item.latitude, lng: item.longitude });
      setMapZoom(10); // Zoom in on the city
    } else {
      // Handle country click
      setMapCenter({ lat: item.latitude, lng: item.longitude });
      setMapZoom(5); // Zoom out to show the country
    }
  
    // Expand the clicked item to show full details
    setExpandedItems((prev) => {
      if (prev.includes(index)) {
        // Collapse if already expanded
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  const renderValue = (value: string | string[] | number | undefined): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value?.toString() || 'Unknown';
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
        <div className="search-form-map" style={{ display: 'flex', height: '90vh', background: 'transparent' }}>
        <div className="search-form-all" style={{ flex: 1, background: '#e9e8e8' }}>
        <form className="search-form">
        <div className="search-wrapper">
          <input
            type="text"
            className="search"
            placeholder="African Country or Capital City"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <img src="/img/icons/search.svg" alt="search icon" className="search-icon" />
          </div>
          {/* <ul className="General" style={{margin: '10px auto'}}>
          <div className="population african-country"><b>Africa</b></div>
          <div className="population"><b>Status:</b>Second largest and second most populous continent.</div>
          </ul> */}
          <ul className="suggestions">
          <div className="suggestion-line"></div>
            {filteredCities.map((place, index) => {
              const regex = new RegExp(query, 'gi');
              const cityName = place.city.replace(regex, `<span class="hl">${query}</span>`);
              const countryName = place.country.replace(regex, `<span class="hl">${query}</span>`);
              const isExpanded = expandedItems.includes(index);

              return (
                <li key={index} onClick={() => handleItemClick(place, index)} className={isExpanded ? 'expanded' : ''}>
                  {!isExpanded && (
                    <>
                    <img src="/img/icons/map-pin.svg" alt="map pin" className="map-pin-icon" />
                    <div className="name" dangerouslySetInnerHTML={{ __html: isExpanded ? `${countryName}` : `${cityName}, ${countryName}` }}></div>
                    <img src="/img/icons/arrow-up-left.svg" alt="arrow" className="arrow-up-icon" />
                    </>
                  )}

                  {isExpanded && (
                    <>
                    <div className="population african-country"><b>{place.country}</b></div>
                    <div className="population" onClick={() => handleItemClick(place, index, true)}><b>Capital:</b> <b className="african-country">{place.city}</b></div>
                    <div className="population"><b>Independence day:</b> {new Date(renderValue(place.independence_day)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div className="population"><b>Population:</b> {renderValue(place.population)}</div>
                    <div className="population"><b>Official language:</b> {renderValue(place.language)}</div>
                    <div className="population"><b>Know for:</b> {renderValue(place.known_for)}</div>
                    <div className="population"><b>Major export:</b> {renderValue(place.major_export)}</div>
                    <div className="population"><b>GDP:</b> {renderValue(place.gdp)}</div>
                    <div className="population"><b>Size:</b> {renderValue(place.size)}</div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </form>
      </div>
      <div className="afrikamapu">
        {apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedCity ? { lat: selectedCity.latitude ?? 0, lng: selectedCity.longitude ?? 0 } : mapCenter}
          zoom={selectedCity ?  10 : mapZoom}
          options={{
            gestureHandling: "greedy",  // Ensures touch gestures work well
            zoomControl: true,          // Enables zoom control buttons on mobile
            fullscreenControl: false,   // Hides the fullscreen button on mobile
          }}
          >
          {filteredCities.map((place, index) => (
          <Marker
          key={index}
          position={{ lat: place.latitude, lng: place.longitude }}
          title={`${place.city}, ${place.country}`}
          />
          ))}
        </GoogleMap>
        </LoadScript>
        ):( <div style={{ color: 'red' }}>Google Maps API key is missing!</div>)}
      </div>
    </div>     
      
    </>
    
   );
}
 
export default WebDevAfrica;