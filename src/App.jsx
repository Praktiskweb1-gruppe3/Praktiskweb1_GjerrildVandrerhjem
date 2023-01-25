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
import AdminNews from './pages/Admin/News/AdminNews';
import AdminImages from './pages/Admin/Images/AdminImages';
import AdminFrontpage from './pages/Admin/Frontpage/AdminFrontpage';
import AdminAbout from './pages/Admin/About/AdminAbout';
import AdminEvents from './pages/Admin/Events/AdminEvents';
import AdminNavigation from './pages/Admin/AdminNav/AdminNavigation';


function App () {

  const [ language, setLanguage ] = useState( 'da' );

  const [ cloudinaryImagePath ] = useState( 'https://res.cloudinary.com/du8bx3kux/image/upload/v1/' );



  return (
    <Router>


      <Context.Provider value={ { language, setLanguage } }>

        <ImagePathContext.Provider value={ { cloudinaryImagePath } }>


          <Navbar />
          <Routes>

            {/* Forside */ }
            <Route index element={ <div>Test</div> } />

            {/* Værelser */ }
            <Route path="/rooms" element={ <Rooms /> } />

            {/* Events */ }
            {/* <Route path="/events" element={} /> */ }

            {/* Aktiviteter */ }
            <Route path="/activities" element={ <Aktiviteter /> } />

            {/* Vi tilbyder */ }
            <Route path="/services" element={ <Services /> } />

            {/* Nyheder */ }
            <Route path="/news" element={ <News /> } />
            <Route path='/newsArchive' element={ <NewsArchive /> } />


            {/* Aktiviteter */ }
            <Route path="/activities" element={ <Aktiviteter /> } />
            <Route path="/activitySelected" element={ <AktiviteterSelected /> } />


            {/* Kontakt */ }
            <Route path="/contact" element={ <Kontakt /> } />


            {/* Om os */ }
            <Route path="/about" element={ <About /> } />

            {/* No Match */ }

            {/* Admin */ }
            <Route path="admin" element={ <Index /> }>

              <Route index element={ <AdminFrontpage /> } />

              <Route path='images' element={ <AdminImages /> } />

              <Route path="events" element={ <AdminEvents /> } />

              <Route path="activities" element={ <AdminActivities /> } />

              {/* Nyheder */ }
              <Route path="news" element={ <AdminNews /> } />

              <Route path="about" element={ <AdminAbout /> } />

              <Route path="navigation" element={ <AdminNavigation /> } />

            </Route>

            <Route path="*" element={ <NoMatch /> } />

          </Routes>

          <Footer />

        </ImagePathContext.Provider>


      </Context.Provider>
    </Router>
  )
}

export default App;
