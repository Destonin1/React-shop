import { createModal } from 'react-modal-promise';
import PropTypes from 'prop-types'
import styles from  "./Modal.module.css";

const MyFlexibleModal = ({ isOpen, onResolve, onReject, text, title, param, onlyOkBtn = false }) => {
    const submit = () => onResolve(param);
    const reject = () => onReject();
  
    return (
        <div className={isOpen ? `${styles.modal} ${styles.modalActive}` : styles.modal }>
            <div className={isOpen ? `${styles.block} ${styles.blockActive}`: styles.block}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button className={styles.close} onClick={reject}>&times;</button>
                </div>
                <div className={styles.body}>
                <p className={styles.text}>{text}</p>
                </div>
                <div className={styles.footer}>
                    <button className={`${styles.accept} ${styles.btn}`} onClick={submit}>Ok</button>
                    {onlyOkBtn ? "" :<button className={`${styles.cancel} ${styles.btn}`} onClick={reject}>Cancel</button>} 
                </div>
            </div>
            <div className={styles.bg}></div>
        </div>
      
    );
};

MyFlexibleModal.propTypes = {
    isOpen : PropTypes.bool,
    text : PropTypes.string,
    title : PropTypes.string,
    param : PropTypes.number,
    onlyOkBtn : PropTypes.bool
}

export const myModal = createModal(MyFlexibleModal);