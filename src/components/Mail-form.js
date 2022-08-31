import { useState } from "react";
import { myModal } from "./Modal";
import letterImg from "../img/mail.png";

const MailForm = () =>  {

    const [mail, setMail] = useState("");

    const mailChange = (e) => {
        setMail(e.target.value);
    }

    const clickMail = (e) => {
        e.preventDefault();
        let modalText = "";
        let modalTitle = "";
        if(mail === "" ) {
            modalTitle = "Error"
            modalText = "Please enter your email address before sending"
        }
        else if(mail.includes("@")) {
            modalTitle = "Thank you!"
            modalText = "Thank you for choosing us!"
        }
        else {
            modalTitle = "Error"
            modalText = "Incorrect email address"
        }
        
        myModal({
          title: modalTitle,
          text: modalText,
          onlyOkBtn : true
        }).catch(() => {})
    }

    return (
        <div className="footer__item letter">
            <span className="letter__title">news letter</span>
            <form className="letter__form">
                <img className="mail-img" src={letterImg} alt="letter"/>
                <input className="letter__form-input" type="email" placeholder="Type your email here" value={mail} onChange={mailChange}/>
                <input className="letter__form-submit" type="submit" value="Join us" onClick={clickMail}/>
            </form>
        </div>
        
    );
  }
  
  export default MailForm;
  