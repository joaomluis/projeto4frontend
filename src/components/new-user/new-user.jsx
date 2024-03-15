import  { useState } from 'react';
import './new-user.css';
import { toast } from 'react-toastify';
import useUserStore from '../../store/useUserStore';



function NewUser({setShowNewUser}) {

    const token = useUserStore(state => state.user.token);

    const [updateUsername, setUpdateUsername] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateFirstName, setUpdateFirstName] = useState('');
    const [updateLastName, setUpdateLastName] = useState('');
    const [updatePhone, setUpdatePhone] = useState('');
    const [updatePhotoMain, setUpdatePhotoMain] = useState('');
    const [updateTypeOfUser, setUpdateTypeOfUser] = useState('');
  


    const createOrUpdateUser = async () => {
        

        const newUser = {
            username: updateUsername,
            password: updatePassword,
            email: updateEmail,
            firstName: updateFirstName,
            lastName: updateLastName,
            phoneNumber: updatePhone,
            imgURL: updatePhotoMain,
            typeOfUser: updateTypeOfUser
        };
    
        const url = `http://localhost:8080/project_backend/rest/users/addUserByPO`;
        
      
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Accept': '*/*',
                        "Content-Type": "application/json",
                        token: token
                    },
                    body: JSON.stringify(newUser)
                });
        
                if (response.ok) {
    
                  
    
                  toast.info('User created successfully', {position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "colored"
                    });
                   
                    
                } else {
                  const errorMessage = await response.text(); 
                  
                  console.error("Failed to create user:", errorMessage);
      
                  }
            } catch (error) {
                console.error("Error creating user:", error);
                return null;
            }
         }

    
    return (
        <>

<main className="create">
          
          <div id="overlay-modal-category"></div>
          <div className="descricaoCategoria">
          <h2 id='create_user_title'>Create new user</h2>

            <input type="text" 
            placeholder="Username" 
            className="register_elemUser" 
            id="register_usernamePO" 
            value={updateUsername}
            onChange={(e) => setUpdateUsername(e.target.value)}
            required />

            <input type="text" 
            placeholder="Password" 
            className="register_elemUser" 
            id="register_passwordPO" 
            value={updatePassword}
            onChange={(e) => setUpdatePassword(e.target.value)}
            required/>
            
            <input type="email" 
            placeholder="Email" 
            className="register_elemUser" 
            id="register_emailPO" 
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            required/>

            <input type="text" 
            placeholder="First name" 
            className="register_elemUser" 
            id="register_firstNamePO" 
            value={updateFirstName}
            onChange={(e) => setUpdateFirstName(e.target.value)}
            required />

            <input type="text" 
            placeholder="Last name" 
            className="register_elemUser" 
            id="register_lastNamePO"
            value={updateLastName}
            onChange={(e) => setUpdateLastName(e.target.value)} 
            required/>

            <input type="text" 
            placeholder="Phone number" 
            className="register_elemUser" 
            id="register_phonePO" 
            value={updatePhone}
            onChange={(e) => setUpdatePhone(e.target.value)}
            required/>
            <input type="url" 
            placeholder="Img URL" 
            className="register_elemUser" 
            id="register_photo_mainPO" 
            value={updatePhotoMain}
            onChange={(e) => setUpdatePhotoMain(e.target.value)}
            required />
            <select  id="register_typeOfUser" 
            name="opcoes"
            value={updateTypeOfUser}
            onChange={(e) => setUpdateTypeOfUser(e.target.value)}
            >
               <option value="developer">Developer</option>
               <option value="scrum_master">Scrum Master</option>
               <option value="product_owner">Product Owner</option>
            </select>

               <div className="buttons">
            <button className="btns_task" id="user_save" onClick={createOrUpdateUser}>Save</button>
            <button className="btns_task" id="user_delete" onClick={() => setShowNewUser(false)} >Cancel</button>
            </div>
            <div id="error_creating_category"></div>
                </div>
           </main>

        </>
)}

export default NewUser;