import { useState, useContext, useEffect } from 'react'
import { ContentData } from '../../Contexts/Content'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./Authorization.module.css"
import SignIn from "./SignIn"
import Registration from "./Registration"
import UserInfoBlock from "./UserInfoBlock"
import Button from "../UI/buttonOrange"
import useOutsideClick from "../../Hooks/ClickOutside"
import userSvg from "../../img/user.svg"

const Authorization = () =>  {

    const { FirebaseApp } = useContext(ContentData)
    const auth = getAuth(FirebaseApp);

    const [logIn, setLogIn] = useState(false);
    const [username, setUsername] = useState("");

    const [showBlock, setShowBlock] = useState(false);
    const [showSignIn, setShowSignIn] = useState(true);

    const showModal = (bool) => {
        setShowBlock(bool);
        if(bool) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "visible"
        }
        
    }
    
    const reset = () => {
        showModal(false);
        setShowSignIn(true);
    }

    const Logout = async () => {
        await signOut(auth);
        setLogIn(false);
        reset()
    }

    const handleClickOutside = () => {
        setShowBlock(false);
    }

    const ref = useOutsideClick(handleClickOutside);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogIn(true);
                setUsername(user.email);
            }
        });
    },[auth])
    
    return (
        <div className={styles.wrap}>
        { logIn ? (
            <div className={styles.login}  ref={ref}>
                <button className={styles.button} onClick = {() => {showModal(!showBlock)}}>
                    <img className={styles.img} src={userSvg} alt="User"/>
                </button>
                <span className={styles.username}>{username}</span>
                <UserInfoBlock 
                    Logout = {Logout}
                    showBlock = {showBlock}
                    username = {username}
                />
            </div>)
            :
            (<div>
                <Button text = {"Sign In"} cb = {() => {showModal(true)}}/>
                {   showBlock ?
                        showSignIn ? 
                            <SignIn
                                showBlock = {showBlock}
                                showModal = {showModal}
                                setShowSignIn = {setShowSignIn}
                            />
                            :<Registration
                                showBlock = {showBlock}
                                showModal = {showModal}
                                setShowSignIn = {setShowSignIn}
                            />
                    : ""
                }
            </div>)
        }
        </div>
  );
}

export default Authorization;
