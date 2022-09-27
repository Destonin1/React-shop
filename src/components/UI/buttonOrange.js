import styles from "./buttonOrange.module.css"

const buttonOrange = (props) => {

    const { cb, text } = props

    return (
        <button className={styles.button} onClick = {cb}>{text}</button>
    );
};

export default buttonOrange;