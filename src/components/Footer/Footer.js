import { Link } from "react-router-dom";
import ModalContainer from "react-modal-promise";
import MailForm from "../Mail-form"
import "./Footer.css";
import logo from "../../img/logo.png";
import mastercard from "../../img/mastercard.svg";
import maestro from "../../img/maestro.svg";
import paypal from "../../img/paypal.svg";
import visa from "../../img/visa.svg";

const Footer = () =>  {

  return (
    <footer className="footer">
        <div className="container">
            <div className="footer__block">
              <div className="footer__item">
                <Link to='/' className="logo">
                    <img src={logo} alt="logo"/>
                </Link>
              </div>
              <MailForm />
              <div className="footer__item payment">
                <h6 className="payment-title">Payment Methods</h6>
                <div className="payment-items">
                  <img className="payment-item" src={mastercard} alt="mastercard"/>
                  <img className="payment-item" src={maestro} alt="maestro"/>
                  <img className="payment-item" src={paypal} alt="paypal"/>
                  <img className="payment-item" src={visa} alt="visa"/>
                </div>
              </div>
            </div>
        </div>
        <ModalContainer/>
    </footer>
    
  );
}

export default Footer;
