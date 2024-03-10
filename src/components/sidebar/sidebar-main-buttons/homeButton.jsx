import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './sidebar-main-buttons.css';
import { Link } from 'react-router-dom';

function HomeButton({logoClicked}) {
    return (
        <div className="edit-profile-button">
            <Link to="/">
                <button className="menu_item" id="btn_edit" >
                    <div className="icon">
                        <FontAwesomeIcon icon={faHouse} size="2x" />
                    </div>
                    {!logoClicked && <div className="text">Home</div>}
                </button>
            </Link>
        </div>
    );
}

export default HomeButton;