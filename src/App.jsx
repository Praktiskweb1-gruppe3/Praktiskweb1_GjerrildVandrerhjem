import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './sass/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './component/Navbar';

import { Context } from './Context/Context';
import Services from './pages/Services';
import Aktiviteter from './pages/Aktiviteter';

import Footer from './component/Footer';
import Kontakt from './pages/Kontakt';


function App () {

  const [ language, setLanguage ] = useState( 'da' );


  return (
    <Router>

      
      <Context.Provider value={ { language, setLanguage } }>

        <Navbar />        
        <Routes>

          {/* Forside */ }
          <Route index element={ <div>Test</div> } />

          {/* Værelser */ }
          {/* <Route path="/rooms" element={} /> */ }

          {/* Events */ }
          {/* <Route path="/events" element={} /> */ }

          {/* Aktiviteter */ }
          <Route path="/activities" element={ <Aktiviteter /> } />

          {/* Vi tilbyder */ }
          <Route path="/services" element={ <Services /> } />


          {/* Nyheder */ }
          {/* <Route path="/news" element={} /> */ }

          {/* Kontakt */ }
          <Route path="/kontakt" element={ <Kontakt /> } />


        </Routes>

        <Footer />

      </Context.Provider>
    </Router>
  )
}

export default App;
