import React, { useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import CategoryRow from './dynamic-row';

function DynamicTable({store}) {
  

    const { headers, data, tableTitle, excludeKeys, displayOrder, buttons, useEditModal } = store(state => ({
        headers: state.headers,
        data: state.data,
        tableTitle: state.tableTitle,
        excludeKeys: state.excludeKeys,
        displayOrder: state.displayOrder,
        buttons: state.buttons,
        useEditModal: state.useEditModal
        
      }));


      

      

  return (
    <main className="taskMain">
            
            <h1 id="title-category">{tableTitle}</h1>

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
            buttons={buttons}
             />
          ))}
        
        </tbody>
      </table>
    </div>
    </main>
  )
}

export default DynamicTable;