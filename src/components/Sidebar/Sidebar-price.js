import PropTypes from 'prop-types'
import styles from "./Sidebar.module.css";

const SidebarItemPrice = (props) =>  {

    const {title, minPrice, onChangeMin, maxPrice, onChangeMax, onSubmit, error} = props;

    const errorStyle = {
        border: '1px solid #FF9494',
        outline: '1px solid #FF9494',
    }

    return (
        <div className={styles.wrap}>
            <h3 className={styles.title}>{title}</h3>
            <form className={styles.formPrice}>
                <label className={styles.label}>Minimum:</label>
                <input className={styles.number} style = {error ? errorStyle : {}} type="number" onChange = {onChangeMin} value={minPrice} name="min"/>
                <span className={styles.currency}>$</span>
                <label className={styles.label}>Maximum:</label>
                <input className={styles.number} style = {error ? errorStyle : {}} type="number" onChange = {onChangeMax} value={maxPrice} name="max"/>
                <span className={styles.currency}>$</span>
                <button className={styles.confirm} onClick = {onSubmit}>Ok</button>
            </form>
        </div>
    );
  }

SidebarItemPrice.propTypes = {
    title : PropTypes.string,
    minPrice : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeMin : PropTypes.func,
    maxPrice : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeMax : PropTypes.func,
    onSubmit : PropTypes.func
}
  
export default SidebarItemPrice;
  