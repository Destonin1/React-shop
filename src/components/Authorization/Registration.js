import { useEffect } from "react"

const Registration = (props) =>  {

    const { setShowBlock, setShowSignIn } = props

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
                    <h2 className="autho-title">Registration</h2>
                    <span className="autho-close" onClick={() => {setShowBlock(false); setShowSignIn(true)}}>&times;</span>
                </div>
                <div className="autho-body">
                    <form className="autho-form">
                        <div className="autho-form__item">
                            <label className="autho-label">Email:</label>
                            <input className="autho-input" type="text" />
                        </div>
                        <div className="autho-form__item">
                            <label className="autho-label">Password:</label>
                            <input className="autho-input" type="text"/>
                        </div>
                        <div className="autho-form__item">
                            <label className="autho-label">Confirm password:</label>
                            <input className="autho-input" type="text"/>
                        </div>
                    </form>
                    <button className="autho-switch" onClick={() => {setShowSignIn(true)}}>Have an account? Log in here.</button>
                </div>
                <div className="autho-footer">
                    <button className="autho-btn autho-btn-close" onClick={() => {setShowBlock(false); setShowSignIn(true)}}>Close</button>
                    <button className="autho-btn autho-btn-submit">Submit</button>
                </div>
            </div>
            <div className="autho-bg" onClick={() => {setShowBlock(false); setShowSignIn(true)}}></div>
        </div>
    );
}

export default Registration;
