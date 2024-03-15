import React, { useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import CategoryRow from './dynamic-row';
import { Link, useLocation } from 'react-router-dom';
import NewUser from '../new-user/new-user.jsx';

function DynamicTable({store}) {
    const location = useLocation();
  

    const { headers, data, tableTitle, excludeKeys, displayOrder, buttons, useEditModal } = store(state => ({
        headers: state.headers,
        data: state.data,
        tableTitle: state.tableTitle,
        excludeKeys: state.excludeKeys,
        displayOrder: state.displayOrder,
        useEditModal: state.useEditModal,
        
      }));


    const [showNewUser, setShowNewUser] = useState(false);
      

  return (
    <main className="taskMain">
            
            <h1 id="title-category">{tableTitle}</h1>
            {location.pathname === '/active-users' && (
                <button id="btn_newUser"onClick={() => setShowNewUser(true)}>
                +New User
              </button>
            )}
            {showNewUser && <NewUser setShowNewUser={setShowNewUser} />}

            <div className="category_table">
                <table id="category_table">
                    <thead>
            <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
         {data.map(item => (
            
            <CategoryRow key={item.idCategory ? item.idCategory : item.username} 
            item={item}
            excludeKeys={excludeKeys}
            displayOrder={displayOrder}
             />
          ))}
        
        </tbody>
      </table>
    </div>
    </main>
  )
}

export default DynamicTable;