import PropTypes from 'prop-types'
import styles from "./Authorization.module.css"
import Button from "../UI/buttonOrange"

const UserInfoBlock = (props) =>  {
    const { Logout, showBlock, username } = props;

    return (
        <div className={showBlock ? `${styles.user} ${styles.userActive}` : styles.user}>
            <span className={styles.usernameHidden}>{username}</span>
            <Button text = {"Log out"} cb = {Logout}/>
        </div>
    );
}

UserInfoBlock.propTypes = {
    Logout : PropTypes.func,
    showBlock : PropTypes.bool,
    username : PropTypes.string,
}


export default UserInfoBlock;
