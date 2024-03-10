import React from 'react';
import SidebarMain from './sidebar-main.jsx';
import SidebarLogin from './sidebar-login.jsx';

function Sidebar({page, logoClicked}) {
   return (
      <div>
        {page === 'login-sidebar' && <SidebarLogin logoClicked={logoClicked} />}
        {page === 'main' && <SidebarMain logoClicked={logoClicked} />}
      </div>
   );
}

export default Sidebar;
