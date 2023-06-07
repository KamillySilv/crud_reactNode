import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav  className="nav-bar">
            <Link className="link-nav" to="/" >Home</Link>
            <Link className="link-nav" to="/create" >Cadastrar</Link>
        </nav>
    )
}

export default NavBar;