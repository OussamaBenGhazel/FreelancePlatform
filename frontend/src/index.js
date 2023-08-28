import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <Routes>

  <Route exact path="/" element={<App/>} />
  </Routes>
  </Router>
  
);



