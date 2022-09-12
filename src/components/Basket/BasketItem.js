import PropTypes from 'prop-types'
import "./BasketItem.css"

const BasketItem = (props) =>  {

  const { id, name, image, price, quantity, onClickDelete, onClickDeduct, onClickAdd, onChangeQuantity } = props;

  return (
    <div className="basket-item">
      <img className="basket-item__image" src={"https://" + image} alt="jacket"/>
      <p className="basket-item__name">{name}</p>
      <div className="quantity">
        <button className="quantity__btn quantity__deduct" onClick={() => onClickDeduct(quantity, id)}>-</button>
        <input className="quantity__input" type="number" value={quantity} onChange={(e) => onChangeQuantity(e.target.value, id)}/>
        <button className="quantity__btn quantity__add" onClick={() => onClickAdd(quantity, id)}>+</button>
      </div>
      <span className="basket-item__price">{(price * quantity).toFixed(2)}$</span>
      <button className="basket-item__delete" onClick={()=>{onClickDelete(id)}}>Remove</button>
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
