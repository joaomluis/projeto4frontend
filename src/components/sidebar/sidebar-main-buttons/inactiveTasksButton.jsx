import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './sidebar-main-buttons.css';

function InactiveTasksButton({logoClicked, token}) {
    return (
        <div className="edit-profile-button">
            <button className="menu_item" id="btn_edit" >
                <div className="icon">
                    <FontAwesomeIcon icon={faClipboardList} size="2x" />
                </div>
                {!logoClicked && <div className="text">Inactive Tasks</div>}
            </button>
        </div>
    );
}

export default InactiveTasksButton;