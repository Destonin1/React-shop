import { useEffect } from "react"

const SignIn = (props) =>  {

    const { email, emailChange, password, passwordChange, setShowBlock, setShowSignIn, ClickSignIn, invalidEmail, userNotFound, wrongPassword } = props

    const showingBlock = () => {
        document.getElementsByClassName("autho-block")[0].classList.add("autho-block_active")
    }

    useEffect(() => {
        setTimeout(showingBlock)
    },[])
    
    return (
        <div className="autho-wrap">
            <div className="autho-block">
                <div className="autho-header">
                    <h2 className="autho-title">Log in</h2>
                    <span className="autho-close" onClick={() => {setShowBlock(false)}}>&times;</span>
                </div>
                <div className="autho-body">
                    <form className="autho-form">
                        <div className="autho-form__item">
                            <label className="autho-label">Email:</label>
                            <input className="autho-input" type="text" value = {email} onChange = {emailChange}/>
                            <span className="autho-error">{invalidEmail ? "invalid email. Try again." : userNotFound ? "User not found" : ""}</span>
                        </div>
                        <div className="autho-form__item">
                            <label className="autho-label">Password:</label>
                            <input className="autho-input" type="password" value = {password} onChange = {passwordChange}/>
                        </div>
                        <span className="autho-error">{wrongPassword ? "Wrong password. Try again." : ""}</span>
                    </form>
                    <button className="autho-switch" onClick={() => {setShowSignIn(false)}}>Don't have an account? Register here</button>
                </div>
                <div className="autho-footer">
                    <button className="autho-btn autho-btn-close" onClick={() => {setShowBlock(false)}}>Close</button>
                    <button className="autho-btn autho-btn-submit" onClick={ClickSignIn}>Submit</button>
                </div>
            </div>
            <div className="autho-bg" onClick={() => {setShowBlock(false)}}></div>
        </div>
    );
}

export default SignIn;
