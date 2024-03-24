import React, { useState } from 'react';
import './sidebar-main-buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersLine, faUserCheck, faUsersSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useInactiveUsers from '../../../store/useInactiveUsersTableStore';
import useActiveUsers from '../../../store/useActiveUsersTableStore';
import { useEffect } from 'react';



function UserCollapsingButton({logoClicked, userType}) {

  const getInactiveUsers = useInactiveUsers((state) => state.getInactiveUsers);
  const getActiveUsers = useActiveUsers((state) => state.getActiveUsers);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    getActiveUsers()
    getInactiveUsers()
}, []);

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
          <Link to="/active-users">
          <button className="menu_item" id="active_users_btn" onClick={()=> getActiveUsers()}>
            <div className="collpased-icon-button">
              <FontAwesomeIcon icon={faUserCheck} size="1x" />
              </div>
              {!logoClicked && <div className="collapsed-buttons-text">Active Users</div>}
            </button>
            </Link>

            {userType === 'product_owner' && (
              <Link to="/inactive-users">
            <button className="menu_item" id='inactive_users_btn' onClick={()=> getInactiveUsers()}> 
              <div className="collpased-icon-button">
                <FontAwesomeIcon icon={faUsersSlash} size="1x" />
              </div>
              {!logoClicked && <div className="collapsed-buttons-text">Inactive Users</div>}
            </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default UserCollapsingButton;