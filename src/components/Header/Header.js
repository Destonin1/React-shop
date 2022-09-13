import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import "./Header.css";
import logo from "../../img/logo.png";
import burger from "../../img/menu-burger.svg";
import closeSvg from "../../img/close.svg";
import Basket from "../Basket/Basket";
import Authorization from "../Authorization/Authorization";

const Header = () =>  {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 750px)").matches
    )

    const [openMenu, setOpenMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 750px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

  return (
    <header className="header">
        <div className="container">
            <div className="header-block">
                <Link to='/' className="logo">
                    <img src={logo} alt="logo"/>
                </Link>
                <nav className="menu">
                    {matches ? "" :
                        openMenu ? <img className="menu-icon" src={closeSvg} onClick={toggleMenu} alt="menu"/> : <img className="menu-icon" src={burger} onClick={toggleMenu} alt="menu"/>
                    }
                    <ul className={openMenu ? "menu__links_open menu__links" : "menu__links"}>
                        <li className="menu__li">
                            <NavLink to='/' className={({ isActive }) => (isActive ? "menu__link link_active" : "menu__link")}>Home</NavLink>
                        </li>
                        <li className="menu__li">
                            <NavLink to='/catalog' className={({ isActive }) => (isActive ? "menu__link link_active" : "menu__link")}>Catalog</NavLink>
                        </li>
                        <li className="menu__li">
                            <NavLink to='/about'  className={({ isActive }) => (isActive ? "menu__link link_active" : "menu__link")}>About</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="side-menu">
                    <Authorization />
                    <Basket />
                </div>
            </div>
        </div>
    </header>
    
  );
}

export default Header;
