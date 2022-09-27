import { Link } from "react-router-dom";
import ModalContainer from "react-modal-promise";
import MailForm from "../Mail-form"
import styles from "./Footer.module.css";
import logo from "../../img/logo.png";
import mastercard from "../../img/mastercard.svg";
import maestro from "../../img/maestro.svg";
import paypal from "../../img/paypal.svg";
import visa from "../../img/visa.svg";

const Footer = () =>  {

  return (
    <footer>
        <div className="container">
            <div className={styles.block}>
              <div>
                <Link to='/' className="logo">
                    <img src={logo} alt="logo"/>
                </Link>
              </div>
              <MailForm />
              <div className={styles.payment}>
                <h6 className={styles.title}>Payment Methods</h6>
                <div className={styles.items}>
                  <img className={styles.item} src={mastercard} alt="mastercard"/>
                  <img className={styles.item} src={maestro} alt="maestro"/>
                  <img className={styles.item} src={paypal} alt="paypal"/>
                  <img className={styles.item} src={visa} alt="visa"/>
                </div>
              </div>
            </div>
        </div>
        <ModalContainer/>
    </footer>
    
  );
}

export default Footer;
