import PropTypes from 'prop-types'
import styles from "./Loader.module.css";

const Loader = (props) =>  {
    const isGray = props.isGray;

    return (
        <div className={ isGray ? styles.container + ' ' + styles.gray : styles.container}>
            <div className={styles.loader}></div>
        </div> 
        
    );
}

Loader.propTypes = {
    isGray : PropTypes.bool
}
  
export default Loader;