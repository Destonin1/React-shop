import { useState } from "react";
import { myModal } from "./Modal";
import Button from "./UI/buttonOrange"
import styles from "./Mail-form.module.css"
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
        <div>
            <span className={styles.title}>news letter</span>
            <form className={styles.form}>
                <img className={styles.img} src={letterImg} alt="letter"/>
                <input className={styles.input} type="email" placeholder="Type your email here" value={mail} onChange={mailChange}/>
                <Button text = {"Join us"} cb = {clickMail}/>
            </form>
        </div>
        
    );
  }
  
  export default MailForm;
  