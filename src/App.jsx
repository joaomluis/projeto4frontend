import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './main.css';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import './base.css';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import useUserStore from './store/useUserStore.jsx';
import MainPageScrum from './components/main-page/main-scrum-page.jsx';
import CreateCategory from './components/createCategory/create-category.jsx';
import CategoriesTable from './components/categories-page/categories-table.jsx';
import { ToastContainer } from 'react-toastify';



function App() {

    const [rotate, setRotate] = useState(false);
    const [page, setPage] = useState('login-sidebar'); 
    const [logoClicked, setLogoClicked] = useState(false); 
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);

    //categorias, para fazer update quando se altera alguma
    const [reload, setReload] = useState(false);

    // para o logo rodar e expandir/contrair o aside 
    const handleRotate = () => {
      setRotate(!rotate);
      setLogoClicked(!logoClicked);
    };

    //para o modal de criar categoria poder ser chamado em qualquer lado
    const toggleCreateCategory = () => {
        setIsCreateCategoryOpen(!isCreateCategoryOpen);
      };



    return (
        <div className="App">
            <div id="body_color" className={rotate ? 'margin80 width95' : 'margin260 width90'}></div>
            <div id="filter_color"></div>
            <Header rotate={rotate} onRotate={handleRotate} />
            {!rotate && <Footer />}
            <Sidebar page={isLoggedIn ? 'main' : 'login-sidebar'} logoClicked={logoClicked} toggleCreateCategory={toggleCreateCategory} />
            
            
        <Routes>
            <Route path="/" element={!isLoggedIn ? <Login /> : <Navigate to="/scrum" />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/scrum" element={<MainPageScrum/>}  />
            <Route path="/create-category" element={<CreateCategory/>} />
            <Route path="/categories" element={<CategoriesTable reload={reload} setReload={setReload}/>}/>
        </Routes>

        {isCreateCategoryOpen && <CreateCategory onClose={toggleCreateCategory} setReload={setReload}/>}

        <ToastContainer />
        </div>
        
    );
}

export default App;