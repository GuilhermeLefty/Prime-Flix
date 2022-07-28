import './header.css';
import { Link } from 'react-router-dom';


function Header(){
    return(
        <header>
            <Link className="logo" to="/">Prime Flix</Link>
            <Link className="Favoritos" to='/Favoritos'>Meus Filmes</Link>

        </header>
    )

}

export default Header;