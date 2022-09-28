import { useState, useContext, useEffect } from "react"
import PropTypes from 'prop-types'
import { ContentData } from '../../Contexts/Content'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./SignInRegister.module.css"

const Registration = (props) =>  {

    const { showBlock, showModal, setShowSignIn } = props

    const { FirebaseApp } = useContext(ContentData)
    const auth = getAuth(FirebaseApp);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [invalidEmail, setInvalidEmail] = useState("");
    const [wrongPassword, setWrongPassword] = useState("");

    const errorStyle = {
        border: '1px solid #FF9494',
        outline: '2px solid #FF9494',
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setInvalidEmail("");
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setWrongPassword("")
    }

    const onChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
        setWrongPassword("")
    }

    const reset = () => {
        showModal(false);
        setShowSignIn(true);
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    }

    const ClickRegister = () => {
        if (password === passwordConfirm) {
            createUserWithEmailAndPassword(auth, email.trim(), password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email);
                reset()
            })
            .catch((error) => {
                console.log(error.message);
                console.log(error.code);
                if(error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
                    setInvalidEmail("Invalid email, please try again.");
                }
                else if(error.code === "auth/wrong-password") {
                    setWrongPassword("Wrong password, please try again.")
                }
            });
        }
        else {
            setWrongPassword("Passwords are not equal, please try again.")
        }
        
    }

    const visualEffect = () => {
        document.getElementsByClassName(styles.block)[0].classList.add(styles.blockActive);
    }

    useEffect(() => {
        setTimeout(visualEffect);
    },[])
    
    return (
        <div className={showBlock ? `${styles.wrap} ${styles.wrapActive}` : styles.wrap}>
            <div className={styles.block}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Registration</h2>
                    <span className={styles.close} onClick={() => {showModal(false); setShowSignIn(true)}}>&times;</span>
                </div>
                <div className={styles.body}>
                    <form className={styles.form}>
                        <label className={styles.label}>Email:</label>
                        <div className={styles.inputBlock}>
                            <input className={styles.input} type="text"  style={invalidEmail ? errorStyle : {}} value={email} onChange={onChangeEmail}/>
                            {invalidEmail ? <span className={styles.error}>{invalidEmail}</span> : "" }
                        </div>
                        <label className={styles.label}>Password:</label>
                        <div className={styles.inputBlock}>
                            <input className={styles.input} type="password" style={wrongPassword ? errorStyle : {}} value={password} onChange={onChangePassword} />
                        </div>
                        <label className={styles.label}>Confirm password:</label>
                        <div className={styles.inputBlock}>
                            <input className={styles.input} type="password" style={wrongPassword ? errorStyle : {}} value={passwordConfirm} onChange={onChangePasswordConfirm} />
                            {wrongPassword ? <span className={styles.error}>{wrongPassword}</span> : "" }
                        </div>
                    </form>
                    <button className={styles.switch} onClick={() => {setShowSignIn(true)}}>Don't have an account? Register here</button>
                </div>
                <div className={styles.footer}>
                    <button className={`${styles.btn} ${styles.submit}`} onClick={ClickRegister}>Submit</button>
                    <button className={`${styles.btn} ${styles.btnClose}`} onClick={() => {showModal(false); setShowSignIn(true)}}>Close</button>
                </div>
            </div>
            <div className={styles.bg} onClick={() => {showModal(false); setShowSignIn(true)}}></div>
        </div>
    );
}

Registration.propTypes = {
    showBlock : PropTypes.bool,
    showModal : PropTypes.func,
    setShowSignIn : PropTypes.func,
}

export default Registration;
