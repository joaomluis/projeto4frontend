import React, { useState, useEffect } from 'react';
import userImg from '../user.png'; 
import useUserStore from '../../store/useUserStore';
import LogoutButton from './sidebar-main-buttons/logoutButton.jsx';
import UserCollapsingButton from './sidebar-main-buttons/usersCollapsingButtons.jsx';
import CategoryCollapsingButton from './sidebar-main-buttons/categoryCollapsingButtons.jsx';
import InactiveTasks from './sidebar-main-buttons/inactiveTasksButton.jsx';
import UserProfileButton from './sidebar-main-buttons/userProfileButton.jsx';
import HomeButton from './sidebar-main-buttons/homeButton.jsx';



function SidebarMain( {logoClicked, toggleCreateCategory}) {

   const userType = useUserStore((state) => state.userType); 
   const token = useUserStore((state) => state.token); 
   

   const [isOpen, setIsOpen] = useState(false);
   const toggleOpen = () => setIsOpen(!isOpen);
 

   return (
      <aside>
         <div className={`menu_item ${logoClicked ? 'reduced-width' : ''}`}>
            <UserProfileButton token={token} logoClicked={logoClicked} />
            <HomeButton token={token} logoClicked={logoClicked} />
            { (userType === 'product_owner' || userType === 'scrum_master') && <UserCollapsingButton token={token} logoClicked={logoClicked} userType={userType}/> }
            { userType === 'product_owner' && <CategoryCollapsingButton token={token} logoClicked={logoClicked} toggleCreateCategory={toggleCreateCategory} /> }
            { (userType === 'product_owner' || userType === 'scrum_master') && <InactiveTasks token={token} logoClicked={logoClicked}/>}
            <LogoutButton token={token} logoClicked={logoClicked}/>
         </div>
      </aside>
   );
}

export default SidebarMain;


// Função para ter data e hora atualizada, não estou a usar de momento 

/*
  const [date, setDate] = useState(new Date().toLocaleString("en-GB"));

  useEffect(() => {
    const writeDate = () => {
      const d = new Date();
      let dateTimeString = d.toLocaleString("en-GB");
      setDate(dateTimeString);
    };

    const intervalId = setInterval(writeDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  */
    
  