import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../img/logo.png";
import Basket from "../Basket/Basket";

const Header = () =>  {
  return (
    <header className="header">
        <div className="container">
            <div className="header-block">
                <Link to='/' className="logo">
                    <img src={logo} alt="logo"/>
                </Link>
                <nav className="menu">
                    <ul className="menu__links">
                        <li className="menu__li">
                            <Link to='/' className="menu__link">Home</Link>
                        </li>
                        <li className="menu__li">
                            <Link to='/catalog' className="menu__link">Catalog</Link>
                        </li>
                        <li className="menu__li">
                            <Link to='/about' className="menu__link">About</Link>
                        </li>
                    </ul>
                </nav>
                <Basket />
            </div>
        </div>
    </header>
    
  );
}

export default Header;
