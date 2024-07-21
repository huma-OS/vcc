import React from 'react';
// import logo from './logo.svg';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
function App() {
  // const title = 'welcome to my page';
  // const years = 10;
  // const link = "http://www.okothsimonhuma.com";
  return (
    <div className="App">
      <Navbar />
      <div className="content body-no-header">
        <Home />
        {/* <h1>{title}</h1>
        <p>{'i am a visual communication consultant'}</p>
        <p>i have {years} years of experience</p>
        <p>i have seviced over { Math.random() * 10000 } customers</p>
        <a href={ link }>my site</a> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
