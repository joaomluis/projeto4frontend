import { useState } from 'react';
import './register.css';

function Register() {

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPhotoMain, setRegisterPhotoMain] = useState('');


  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      username: registerUsername,
      password: registerPassword,
      email: registerEmail,
      firstName: registerFirstName,
      lastName: registerLastName,
      phoneNumber: registerPhone,
      imgURL: registerPhotoMain,
      typeOfUser: "developer"
  };


    const registerRequest = "http://localhost:8080/project_backend/rest/users/addUserDB";

    try {
      const response = await fetch(registerRequest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        alert("Account registered successfully!");

      
      } else {
        const errorData = await response.text();
        alert(errorData); //mudar para modal
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong");
    }
  };


  return (
    
        <main>
          <form id="form_register" onSubmit={handleRegisterSubmit}>
            <h2>Account creation</h2>
            <input 
              type="text" 
              placeholder="Username" 
              className="register_elem" 
              id="register_username" required
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)} />

            <input 
              type="text" 
              placeholder="Password" 
              className="register_elem" 
              id="register_password" required 
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}/>

            <input 
              type="email" 
              placeholder="Email" 
              className="register_elem" 
              id="register_email" required 
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)} />

            <input 
              type="text" 
              placeholder="First name" 
              className="register_elem" 
              id="register_firstName" required 
              value={registerFirstName}
              onChange={(e) => setRegisterFirstName(e.target.value)}/>

            <input 
              type="text" 
              placeholder="Last name" 
              className="register_elem" 
              id="register_lastName" required 
              value={registerLastName}
              onChange={(e) => setRegisterLastName(e.target.value)}/>

            <input 
              type="text" 
              placeholder="Phone number" 
              className="register_elem" 
              id="register_phone" required 
              value={registerPhone}
              onChange={(e) => setRegisterPhone(e.target.value)}/>

            <input 
              type="url" 
              placeholder="Img URL" 
              className="register_elem" 
              id="register_photo_main" required 
              value={registerPhotoMain}
              onChange={(e) => setRegisterPhotoMain(e.target.value)}/>
              
            <button className="register_elem" id="register_submit">Confirm</button>
          </form>
        </main>
  );
}

export default Register;