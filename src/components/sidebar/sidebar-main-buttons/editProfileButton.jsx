import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './sidebar-main-buttons.css';
import { Link } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';

function EditProfileButton({logoClicked, token}) {

    const userImg = useUserStore((state) => state.imgURL); 
    const firstName = useUserStore((state) => state.firstName);

    return (
        <div className="edit-profile-button">
            <Link to = "/edit-profile">
                <button className={`menu_item ${logoClicked ? 'reduced-width-user-name' : ''}`} id="user_name">
                    <img id="user_img" src={userImg} alt="User logo" />
                    <span id="user-first-name">{!logoClicked && firstName}</span>
                </button>
            </Link>
        </div>
    );
}

export default EditProfileButton;