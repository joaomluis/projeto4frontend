import React, { useState } from 'react';
import './sidebar-main-buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersSlash, faBarsProgress, faListUl, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



function UserCollapsingButton({logoClicked, toggleCreateCategory}) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);


    return (
        <div className="users-collapse-button">
            <button className="menu_item" id="btn_edit" onClick={toggleOpen} >
                <div className="icon">
                    <FontAwesomeIcon icon={faBarsProgress} size="2x" />
                </div>
                {!logoClicked && <div className="text">Categories</div>}
            </button>
            {isOpen && (
        <div>
          <button className="menu_item" id="active_users_btn">
            <div className="collpased-icon-button">
              <FontAwesomeIcon icon={faListUl} size="1x" />
              </div>
              {!logoClicked && <div className="collapsed-buttons-text">Category List</div>}
            </button>
            
          <button className="menu_item" id='inactive_users_btn' onClick={toggleCreateCategory}>
            <div className="collpased-icon-button">
              <FontAwesomeIcon icon={faPlus} size="1x" />
              </div>
              {!logoClicked && <div className="collapsed-buttons-text">Create Category</div>}
            </button>
           
        </div>
      )}
        </div>
    );
}

export default UserCollapsingButton;