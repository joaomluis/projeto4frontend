import userImage from '../user.png';
import useUserStore from '../../store/useUserStore';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';






async function getUserByToken(token) {
    try {
        const response = await fetch("http://localhost:8080/project_backend/rest/users/user", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: token
            }
        });

        if (response.ok) {
            const user = await response.json();

            return user;
        } else {
            console.error("Failed to fetch user data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}


function EditProfile() {

    const userImg = useUserStore((state) => state.imgURL); 
    const firstName = useUserStore((state) => state.firstName);
    const token = useUserStore((state) => state.token);
    const navigate = useNavigate(); 

    //user que o getUserByToken vai buscar
    const [userFetched, setUserFetched] = useState(null);

    useEffect(() => {
        getUserByToken(token).then((userFetched) => {
            setUserFetched(userFetched);
            setUpdateEmail(userFetched.email);
            setUpdateFirstName(userFetched.firstName);
            setUpdateLastName(userFetched.lastName);
            setUpdatePhone(userFetched.phoneNumber);
            setUpdateImgUrl(userFetched.imgURL);
        });
    }, [token]);


    //dados dos inputs 
    const [updatePassword, setUpdatePassword] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateFirstName, setUpdateFirstName] = useState('');
    const [updateLastName, setUpdateLastName] = useState('');
    const [updatePhone, setUpdatePhone] = useState('');
    const [updateImgUrl, setUpdateImgUrl] = useState('');


    async function handleUpdateProfile(e) {
        e.preventDefault();


        const updatedUser = {
            firstName: updateFirstName,
            lastName: updateLastName,
            email: updateEmail,
            password: updatePassword,
            phoneNumber: updatePhone,
            imgURL: updateImgUrl

        };
    
        try {
            const response = await fetch('http://localhost:8080/project_backend/rest/users/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'token': token
                },
                body: JSON.stringify(updatedUser)
            });
    
            if (response.ok) {

                const data = await response.json();
                useUserStore.setState({firstName: data.firstName, imgURL: data.imgURL});

                toast.info("Profile updated successfully", {position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                theme: "colored"
                });
                
                navigate('/scrum');
        
              
              } else {
                const errorData = await response.text();
                alert(errorData); //mudar para modal
              }
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
     


    return (
        <>
        {userFetched && (
        <div className="edit_container">

                <div className="edit_photo">
                    <img src={userFetched.imgURL} id="user_photo" alt="User photo" />
                    <p id="username_edit">{userFetched.firstName}</p>
                </div>
         <div className="edit_profile">
            <div>
               <label  className="descriptioLabel">Password</label>
               <input type="text"
                className="edit_element" 
                id="edit_password" 
                onChange={(e) => setUpdatePassword(e.target.value)}/>
            </div>
            <div>
               <label className="descriptioLabel">Email</label>
               <input type="text" 
               className="edit_element" 
               id="edit_email" 
               value={updateEmail} 
               onChange={(e) => setUpdateEmail(e.target.value)} />
            </div>
            <div>
               <label  className="descriptioLabel">First Name</label>
               <input type="text" 
               className="edit_element" 
               id="edit_firstName" 
               value={updateFirstName}
               onChange={(e) => setUpdateFirstName(e.target.value)}/>
            </div>
            
            <div>
               <label  className="descriptioLabel">Last Name</label>
               <input type="text" 
               className="edit_element" 
               id="edit_lastName" 
               value={updateLastName} 
               onChange={(e) => setUpdateLastName(e.target.value)}/>
            </div>
            <div>
               <label  className="descriptioLabel">Phone Number</label>
               <input type="text" 
               className="edit_element" 
               id="edit_phone" 
               value={updatePhone} 
               onChange={(e) => setUpdatePhone(e.target.value)}/>
            </div>
            <div>
               <label  className="descriptioLabel">URL Image</label>
               <input type="text" 
               className="edit_element" 
               id="edit_URL" 
               value={updateImgUrl}
               onChange={(e) => setUpdateImgUrl(e.target.value)} />
            </div>

         </div>
         <div className="confirm_profile">
            <button className="btn_save" id="btn-save" onClick={handleUpdateProfile}>Save</button>
            <Link to = "/scrum">
            <button className="btn_cancel" id="btn_cancel">Back</button>
            </Link>
         </div>
      </div>  
        )}  
        
        
        </>

    )



}

export default EditProfile;