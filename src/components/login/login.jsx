
import React, { useState } from 'react';
import '../../main.css';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import useTasksStore from '../../store/useTasksStore';


function Login() {
   
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const setUser = useUserStore(state => state.setUser);
   const navigate = useNavigate();

   const getActiveTasks = useTasksStore(state => state.getActiveTasks);
   
   const handleSubmit = async (event) => {
      event.preventDefault();

      
      try {
         const response = await fetch(
            "http://localhost:8080/project_backend/rest/users/login",
            {
               method: "POST",
               headers: {
                  Accept: "*/*",
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ username, password }),
            }
         );

         if (response.ok) {
            const data = await response.json();

            setUser(data);
            getActiveTasks();
            
            navigate('/scrum');

         } else if (response.status === 404) {
            alert("Wrong username or password");
         } else {
            alert("Something went wrong:(");
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <main className="main" id="login_main">
         <form id="login_form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div id="login_inputs">
               <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  className="login_inputs"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
               />

               <div className="form_group">
                  <input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Password"
                     className="login_inputs"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>
            </div>

            <div className="form_group">
               <button type="submit" id="btn_login">Login</button>
            </div>
         </form>
         <div id="signup">Don't have an account? <Link to="/register">Sign up</Link></div>
      </main>
   );
}


export default Login;
