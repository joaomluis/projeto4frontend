import React from 'react';
import userImg from '../../user.png';
import useUserStore from '../../../store/useUserStore';
import './sidebar-main-buttons.css';

function UserProfileButton({logoClicked, token}) {

    const userImg = useUserStore((state) => state.imgURL); 
   const firstName = useUserStore((state) => state.firstName);

  return (
    <>
      <button className={`menu_item ${logoClicked ? 'reduced-width-user-name' : ''}`} id="user_name">
        <img id="user_img" src={userImg} alt="User logo" />
        <span id="user-first-name">{!logoClicked && firstName}</span>
      </button>
    </>
  );
}

export default UserProfileButton;