import PropTypes from 'prop-types'
import styles from "./Sidebar.module.css";
import Loader from "../Loader";

const SidebarItemCheckbox = (props) =>  {

    const {title, items, onChange} = props;

    return (
        <div className={styles.wrap}>
            <h3 className={styles.title}>{title}</h3>
            <form className={styles.formCheckbox}>
            {
                items.length === 0 ?
                    <Loader />
                    
                    :items.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <input className={styles.checkbox} id={item + index} type="checkbox" onClick={() => {onChange(item)}} name={item}></input>
                        <label className={styles.square} htmlFor={item + index}>{item}</label>
                    </div>
                )
                )
            }
            </form>
        </div>
    );
}

SidebarItemCheckbox.propTypes = {
    title : PropTypes.string,
    items : PropTypes.arrayOf(PropTypes.string),
    onChange : PropTypes.func
}
  
export default SidebarItemCheckbox;
  