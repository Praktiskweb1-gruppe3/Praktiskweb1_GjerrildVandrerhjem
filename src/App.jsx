import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './sass/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './component/Navbar';

import { Context } from './Context/Context';
// import ImageTest from './component/ImageTest';
import Services from './pages/Services';



function App() {

  const [language, setLanguage] = useState('da');


  return (
    <Router>

      <Context.Provider value={{language, setLanguage}}>      

      <Navbar />


      <Routes>

        {/* Forside */}
        <Route index element={<div>Test</div>} />

        {/* Værelser */} 
        {/* <Route path="/rooms" element={} /> */}

        {/* Events */} 
        {/* <Route path="/events" element={} /> */}

        {/* Aktiviteter */} 
        {/* <Route path="/activities" element={} /> */}

        {/* Vi tilbyder */} 
        <Route path="/services" element={<Services />} />


        {/* Nyheder */} 
        {/* <Route path="/news" element={} /> */}




      </Routes>
      </Context.Provider>
    </Router>
  )
}

export default App;
