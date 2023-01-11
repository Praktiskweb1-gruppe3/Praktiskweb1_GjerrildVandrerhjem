import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './sass/App.scss';

import Navbar from './component/Navbar';



function App() {

  return (
    <Router>

      <Navbar />

      <Routes>
        {/* <Route index element={} /> */}
      </Routes>
      
    </Router>
  )
}

export default App;
