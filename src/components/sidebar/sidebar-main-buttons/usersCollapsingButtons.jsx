import React, { useState } from 'react';
import './sidebar-main-buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersLine, faUserCheck, faUsersSlash } from '@fortawesome/free-solid-svg-icons';



function UserCollapsingButton({logoClicked, userType}) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="users-collapse-button">
            <button className="menu_item" id="btn_edit" onClick={toggleOpen} >
                <div className="icon">
                    <FontAwesomeIcon icon={faUsersLine} size="2x" />
                </div>
                {!logoClicked && <div className="text">Users</div>}
            </button>
            {isOpen && (
        <div>
          <button className="menu_item" id="active_users_btn">
            <div className="collpased-icon-button">
              <FontAwesomeIcon icon={faUserCheck} size="1x" />
              </div>
              {!logoClicked && <div className="collapsed-buttons-text">Active Users</div>}
            </button>

            {userType === 'product_owner' && (
            <button className="menu_item" id='inactive_users_btn'>
              <div className="collpased-icon-button">
                <FontAwesomeIcon icon={faUsersSlash} size="1x" />
              </div>
              {!logoClicked && <div className="collapsed-buttons-text">Inactive Users</div>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserCollapsingButton;