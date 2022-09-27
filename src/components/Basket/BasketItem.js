import PropTypes from 'prop-types'
import styles from "./BasketItem.module.css"

const BasketItem = (props) =>  {

  const { id, name, image, price, quantity, onClickDelete, onClickDeduct, onClickAdd, onChangeQuantity } = props;

  return (
    <div className={styles.wrap}>
      <img className={styles.img} src={"https://" + image} alt="jacket"/>
      <p className={styles.name}>{name}</p>
      <div className={styles.quantity}>
        <button className={styles.btn} onClick={() => onClickDeduct(quantity, id)}>-</button>
        <input className={styles.input} type="number" value={quantity} onChange={(e) => onChangeQuantity(e.target.value, id)}/>
        <button className={styles.btn} onClick={() => onClickAdd(quantity, id)}>+</button>
      </div>
      <span className={styles.price}>{(price * quantity).toFixed(2)}$</span>
      <button className={styles.remove} onClick={()=>{onClickDelete(id)}}>Remove</button>
    </div>
  );
}

BasketItem.propTypes = {
  id : PropTypes.number,
  name : PropTypes.string,
  image : PropTypes.string,
  price : PropTypes.number,
  quantity : PropTypes.number,
  onClickDelete : PropTypes.func,
  onClickDeduct : PropTypes.func,
  onClickAdd : PropTypes.func,
  onChangeQuantity : PropTypes.func,
}

export default BasketItem;
