import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import styles from "./Header.module.css";
import logo from "../../img/logo.png";
import burger from "../../img/menu-burger.svg";
import closeSvg from "../../img/close.svg";
import Basket from "../Basket/Basket";
import Authorization from "../Authorization/Authorization";
import useOutsideClick from "../../Hooks/ClickOutside"

const Header = () =>  {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    const [openMenu, setOpenMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const handleClickOutside = () => {
        setOpenMenu(false);
    }

    const ref = useOutsideClick(handleClickOutside);
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

  return (
    <header>
        <div className="container">
            <div className={styles.block}>
                <Link to='/' className="logo">
                    <img src={logo} alt="logo"/>
                </Link>
                <nav className={styles.menu} ref={ref}>
                    {matches ? "" :
                        openMenu ? <img className={styles.icon} src={closeSvg} onClick={toggleMenu} alt="menu"/> : <img className={styles.icon} src={burger} onClick={toggleMenu} alt="menu"/>
                    }
                    <ul className={openMenu ? `${styles.linksOpen} ${styles.links}` : styles.links }>
                        <li className={styles.item}>
                            <NavLink to='/' className={({ isActive }) => (isActive ? `${styles.linkActive} ${styles.link}` : styles.link)}>Home</NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink to='/catalog' className={({ isActive }) => (isActive ? `${styles.linkActive} ${styles.link}` : styles.link)}>Catalog</NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink to='/about'  className={({ isActive }) => (isActive ? `${styles.linkActive} ${styles.link}` : styles.link)}>About</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={styles.sideMenu}>
                    <Authorization />
                    <Basket />
                </div>
            </div>
        </div>
    </header>
    
  );
}

export default Header;
