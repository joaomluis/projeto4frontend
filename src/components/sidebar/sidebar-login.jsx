import React from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SidebarLogin({ logoClicked }) {
    return (
           <aside>
                
                <div className={`menu_item ${logoClicked ? 'reduced-width' : ''}`}>
                <Link to="/">
                   <button className="menu_item" id="btn_edit" >
                       <div className="icon">
                           <FontAwesomeIcon icon={faSignInAlt} size="2x" />
                       </div>
                       {!logoClicked && <div className="text">Login</div>}
                   </button>
                     </Link>

                     <Link to="/register">
                   <button className="menu_item" id="btn_edit">
                       <div className="icon">
                           <FontAwesomeIcon icon={faUserPlus} size="2x" />
                       </div>
                       {!logoClicked && <div className="text">Register</div>}
                   </button>
                     </Link>
               </div>
           </aside>

           
    );
}


export default SidebarLogin;