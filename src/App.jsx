import React, {useState} from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './main.css';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import './base.css';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import useUserStore from './store/useUserStore.jsx';


function App() {

    const [rotate, setRotate] = useState(false);
    const [page, setPage] = useState('login-sidebar'); 
    const [logoClicked, setLogoClicked] = useState(false); 
    const location = useLocation();
    const isLoggedIn = useUserStore(state => state.isLoggedIn);

    const handleRotate = () => {
      setRotate(!rotate);
      setLogoClicked(!logoClicked);
    };



    return (
        <div className="App">
            <div id="body_color" className={rotate ? 'margin80 width95' : 'margin260 width90'}></div>
            <div id="filter_color"></div>
            <Header rotate={rotate} onRotate={handleRotate} />
            {!rotate && <Footer />}
            <Sidebar page={isLoggedIn ? 'main' : 'login-sidebar'} logoClicked={logoClicked} />
            
            
        <Routes>
            <Route path="/" element={!isLoggedIn ? <Login /> : <Navigate to="/scrum" />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/scrum" element={<h1>test</h1>}  />
        </Routes>

        </div>
        
    );
}

export default App;