
import './App.css';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import User from './components/User/User';
import Contact from './components/Contact/Contact';
import SignUp from './components/SignUp/SignUp';
import Feed from './components/Feed/Feed';
import About from './components/About/About';

function App() {
  return (
    <>
    <NavBar />
    
        <Routes>
        <Route exact path="/feed/:id" element={<Feed/>} />
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        
    </>
  );
}

export default App;
