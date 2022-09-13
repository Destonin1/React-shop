import { useState, useContext } from 'react'
import { ContentData } from '../../Contexts/Content'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Authorization.css"
import SignIn from "./SignIn"
import Registration from "./Registration"
import userSvg from "../../img/user.svg"

const Authorization = () =>  {

    const { FirebaseApp } = useContext(ContentData)
    const auth = getAuth(FirebaseApp);

    const [showBlock, setShowBlock] = useState(false);
    const [showSignIn, setShowSignIn] = useState(true);
    const [isLogIn, setIsLogIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        invalidEmail(false);
        userNotFound(false);
    }

    const ClickSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setIsLogIn(user.email)
        })
        .catch((error) => {
            if(error.code === "auth/invalid-email") {
                setInvalidEmail(true);
                console.log(1)
            }
            if(error.code === "auth/user-not-found") {
                setUserNotFound(true)
                console.log(2)
            }
            if(error.code === "auth/wrong-password") {
                setWrongPassword(true)
                console.log(3)
            }
        });
    }
    
    return (
    <>
        <div className="user-menu">
            <button className="btn-user" onClick = {() => {setShowBlock(!showBlock)}}>
                <img className='user-img' src={userSvg} alt="User"/>
            </button>
            { isLogIn ? <span className="user-name">UserName</span>: ""}
        </div>
        {showBlock ? showSignIn ? 
        <SignIn
            email = {email}
            emailChange = {onChangeEmail}
            password = {password}
            passwordChange = {setPassword}
            setShowBlock = {setShowBlock}
            setShowSignIn = {setShowSignIn}
            ClickSignIn = {ClickSignIn}
            invalidEmail = {invalidEmail}
            userNotFound = {userNotFound}
            wrongPassword = {wrongPassword}
        />:<Registration 
            setShowBlock = {setShowBlock}
            setShowSignIn = {setShowSignIn}
        /> : ""}
    </>
  );
}

export default Authorization;
