import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './sidebar-main-buttons.css';

function EditProfileButton({logoClicked, token}) {
    return (
        <div className="edit-profile-button">
            <button className="menu_item" id="btn_edit" >
                <div className="icon">
                    <FontAwesomeIcon icon={faUserEdit} size="2x" />
                </div>
                {!logoClicked && <div className="text">Edit Profile</div>}
            </button>
        </div>
    );
}

export default EditProfileButton;