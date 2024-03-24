import './sidebar-main-buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import useTasksStore from '../../../store/useTasksStore';



function LogoutButton({logoClicked, token}) {

    const navigate = useNavigate();
    const setLoggedIn = useUserStore(state => state.setLoggedIn);
    const { reset } = useTasksStore();

    async function logoutUser() {
        try {
          const response = await fetch("http://localhost:8080/project_backend/rest/users/logout", {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              'token': token
            }
          });
    
          if (response.ok) {
            const data = await response.text();
        
            
          } else {
            const error = await response.text();
            
          }
        } catch (error) {
          console.error('Fetch Error:', error);
        }
      }

      const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
          await logoutUser();
          localStorage.clear();
          setLoggedIn(false);
          navigate("/");
          reset();
          
          
        }
      };

    return (
        <div className="logout-button">
            
            <button className="menu_item" id="btn_edit" onClick={handleLogout}>
                <div className="icon">
                    <FontAwesomeIcon icon={faSignOutAlt} size="2x" /> 
                </div>
                {!logoClicked && <div className="text">Logout</div>}
            </button>
            
        </div>
    );
}

export default LogoutButton;