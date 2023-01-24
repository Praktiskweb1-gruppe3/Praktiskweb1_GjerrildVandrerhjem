import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './sass/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './component/Navbar';

import { Context } from './Context/Context';
import Services from './pages/Services';
import Aktiviteter from './pages/Aktiviteter';
import AktiviteterSelected from './pages/AktiviteterSelected';
import About from './pages/About';

//News
import News from './pages/News';
import NewsArchive from './pages/NewsArchive';

//No Match
import NoMatch from './pages/NoMatch';

import Footer from './component/Footer';
import Kontakt from './pages/Kontakt';

// Admin
import Index from './pages/Admin/Index';
import AdminActivities from './pages/Admin/Activities/AdminActivities';


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
          
          {/* Nyheder */}
          <Route path="/news" element={<News/>}/>
          <Route path='/newsArchive' element={<NewsArchive/>}/>


          {/* Aktiviteter */} 
          <Route path="/activities" element={<Aktiviteter />} />
          <Route path="/activitySelected" element={<AktiviteterSelected />} />


          {/* Kontakt */ }
          <Route path="/contact" element={ <Kontakt /> } />


          {/* Om os */ }
          <Route path="/about" element={ <About /> } />


          {/* Admin */ }
          <Route path="admin" element={ <Index  /> }> 

            {/* <Route index element={} /> */}
            <Route path="activities" element={<AdminActivities />} />
          
          
          </Route>

          {/* No Match */}
          <Route path="*" element={<NoMatch/>}/> 

        </Routes>

        <Footer  />

      </Context.Provider>
    </Router>
  )
}

export default App;
