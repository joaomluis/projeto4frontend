import React, { useState} from "react";
import logo from '../../components/scrum_image.png';
import './header.css';


function Header({rotate, onRotate}) {

   return (
      <header>
         
         <h1 id="page-logo"><img src={logo}
          id="scrum_img" 
          alt="App logo"
          className = {rotate ? "rotate" : ""}
          onClick={onRotate}
          /> 
          {!rotate && ' AgileUp'}</h1>
          
      </header>
   );
}

export default Header;