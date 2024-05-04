import { Link } from 'react-router-dom'
import PathConstants from '../../routes/pathConstants';

const Header = () => {
    return (
        <header>
            <div className="header-div">

            <h1 className="title"><Link to={PathConstants.HOME}>my home page</Link></h1>
                <nav className="navbar">
                    <ul className="navlist">
                        <li className="nav-item"><Link to={PathConstants.HOME}>Home</Link></li>
                        <li className="nav-item"><Link to={PathConstants.ABOUT}>About</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
