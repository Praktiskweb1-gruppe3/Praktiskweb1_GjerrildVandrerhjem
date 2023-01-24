import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './sass/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './component/Navbar';

import { Context } from './Context/Context';
import { ImagePathContext } from './Context/ImagePathContext';

import Services from './pages/Services';
import Aktiviteter from './pages/Aktiviteter';
import AktiviteterSelected from './pages/AktiviteterSelected';
import About from './pages/About';
import Rooms from './pages/Rooms';
<<<<<<< Updated upstream
import NoMatch from './pages/NoMatch';
=======
>>>>>>> Stashed changes

import Footer from './component/Footer';
import Kontakt from './pages/Kontakt';

// Admin
import Index from './pages/Admin/Index';
import AdminActivities from './pages/Admin/Activities/AdminActivities';
import AdminFrontpage from './pages/Admin/Frontpage/AdminFrontpage';


function App() {

  const [language, setLanguage] = useState('da');

  const [ cloudinaryImagePath ] = useState( 'https://res.cloudinary.com/du8bx3kux/image/upload/v1/' );



  return (
    <Router>


      <Context.Provider value={ { language, setLanguage } }>

        <ImagePathContext.Provider value={ { cloudinaryImagePath } }>


<<<<<<< Updated upstream
          <Navbar />
          <Routes>

            {/* Forside */ }
            <Route index element={ <div>Test</div> } />

          {/* Værelser */ }
           <Route path="/rooms" element={<Rooms/>} /> 

            {/* Events */ }
            {/* <Route path="/events" element={} /> */ }

            {/* Aktiviteter */ }
            <Route path="/activities" element={ <Aktiviteter /> } />

            {/* Vi tilbyder */ }
            <Route path="/services" element={ <Services /> } />


            {/* Aktiviteter */ }
            <Route path="/activities" element={ <Aktiviteter /> } />
            <Route path="/activitySelected" element={ <AktiviteterSelected /> } />


            {/* Kontakt */ }
            <Route path="/contact" element={ <Kontakt /> } />
=======
          {/* Forside */ }
          <Route index element={ <div>Forsiden</div> } />


          {/* Værelser */ }
          <Route path="/rooms" element={ <Rooms /> } />

>>>>>>> Stashed changes


<<<<<<< Updated upstream
            {/* Om os */ }
            <Route path="/about" element={ <About /> } />

          {/* No Match */}
          <Route path="*" element={<NoMatch/>}/> 
=======

          {/* Aktiviteter */ }
          <Route path="/activities" element={ <Aktiviteter /> } />


          {/* Vi tilbyder */ }
          <Route path="/services" element={ <Services /> } />
>>>>>>> Stashed changes

            {/* Admin */ }
            <Route path="admin" element={ <Index /> }>

              <Route index element={ <AdminFrontpage /> } />

<<<<<<< Updated upstream
              {/* <Route index element={} /> */ }
              <Route path="activities" element={ <AdminActivities /> } />
=======

          {/* Kontakt */ }
          <Route path="/contact" element={ <Kontakt /> } />
>>>>>>> Stashed changes


            </Route>


<<<<<<< Updated upstream
          </Routes>

          <Footer />
=======
          {/* Admin */ }
          <Route path="/admin" element={ <Index /> } />
>>>>>>> Stashed changes

        </ImagePathContext.Provider>

<<<<<<< Updated upstream
=======
        <Footer />
>>>>>>> Stashed changes

      </Context.Provider>
    </Router>
  )
}

export default App;
