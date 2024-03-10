import React from 'react';
import userImg from '../user.png'; 
import useUserStore from '../../store/useUserStore';
import LogoutButton from './sidebar-main-buttons/logoutButton.jsx';
import EditProfileButton from './sidebar-main-buttons/editProfileButton.jsx';



function SidebarMain() {

   const userType = useUserStore((state) => state.userType); 
   const token = useUserStore((state) => state.token); 

   return (
      <aside>
         <div id="menu">
            <p className="menu_item" id="user_name">
               <img id="user_img" src={userImg} alt="User logo" />
               <span id="user">Username</span>
            </p>
            <div className="menu_item" id="date"></div>
            <EditProfileButton token={token}/>
            <LogoutButton token={token}/>
            <div className="menu_item" id="menu">
               
            </div>
         </div>
      </aside>
   );
}

export default SidebarMain;
