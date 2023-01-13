import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './sass/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './component/Navbar';

import { Context } from './Context/Context';
import ImageTest from './component/ImageTest';



function App() {

  const [language, setLanguage] = useState('da');


  return (
    <Router>

      <Context.Provider value={{language, setLanguage}}>      

      <Navbar />


      <Routes>

        {/* Forside */}
        <Route index element={<ImageTest />} />

        {/* Værelser */} 
        {/* <Route path="/rooms" element={} /> */}

        {/* Events */} 
        {/* <Route path="/events" element={} /> */}

        {/* Aktiviteter */} 
        {/* <Route path="/activities" element={} /> */}

        {/* Vi tilbyder */} 
        {/* <Route path="/services" element={} /> */}


        {/* Nyheder */} 
        {/* <Route path="/news" element={} /> */}




      </Routes>
      </Context.Provider>
    </Router>
  )
}

export default App;
