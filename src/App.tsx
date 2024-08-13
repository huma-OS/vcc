import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Gallery from './Gallery';
import About from './About';
import WebDevQuiz from './WebDevQuiz';
import WebDevAfrica from './WebDevAfrica';
import WebDevBlog from './WebDevBlog';
import WebDevInvoice from './WebDevInvoice';

import { Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  return (
      <div className="App">
        <Navbar />
        <div className="content body-no-header">
          <Routes>
            <Route path="/gallery/web-development-invoice" Component={WebDevInvoice} />
            <Route path="/gallery/web-development-blog" Component={WebDevBlog} />
            <Route path="/gallery/web-development-africa" Component={WebDevAfrica} />
            <Route path="/gallery/web-development-quiz" Component={WebDevQuiz} />
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
