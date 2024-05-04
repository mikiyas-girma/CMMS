import { Link } from 'react-router-dom'
import PathConstants from '../../routes/pathConstants';
import { Grid, GridItem } from '@chakra-ui/react'

const Header = () => {
    return (
        <header>
            <div className="header-div">

            <h1 className="title"><Link to={PathConstants.HOME}>CMMS website</Link></h1>
                <nav className="navbar">
                    <ul className="navlist">
                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                            <GridItem w='100%' h='10' bg='blue.500' ><li className="nav-item">
                                <Link to={PathConstants.HOME}>Home</Link></li></GridItem>
                        
                        <li className="nav-item"><Link to={PathConstants.ABOUT}>About</Link></li>
                        </Grid>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
