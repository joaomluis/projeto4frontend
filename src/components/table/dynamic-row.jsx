


function DynamicRow({ item, excludeKeys, displayOrder, buttons, useEditModal}) {
    
 
  const idField = item.idCategory ? 'idCategory' : 'username';
  const id = item[idField];
  
    return (
      <tr>
        {displayOrder.filter(key => !excludeKeys.includes(key)).map(key => {
          
          if (key === 'author') {
            return <td key={`${item[idField]}-${key}`}>{item[key].username}</td>;
          } else if (key === 'username') {
            return <td key={`${item[idField]}-${key}`}>{item[key]}</td>;
          } else {
            return <td key={`${item[idField]}-${key}`}>{item[key]}</td>;
          }
        })}
        <td>
         {buttons(id)}
        </td>
      </tr>
    );
  }

  export default DynamicRow;