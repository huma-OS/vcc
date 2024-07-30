import React from 'react';
// import logo from './logo.svg';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
// import About from './About';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    // <Router>
      <div className="App">
        <Navbar />
        <div className="content body-no-header">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Gallery /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    // </Router>
   
  );
}

export default App;
