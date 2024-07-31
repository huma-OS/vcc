import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Gallery from './Gallery';
import About from './About';

import { Route, Routes } from 'react-router-dom';


function App() {
  return (
      <div className="App">
        <Navbar />
        <div className="content body-no-header">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/gallery/:category" element={<Gallery />} />
          </Routes>
        </div>
        <Footer />
      </div>

   
  );
}

export default App;
