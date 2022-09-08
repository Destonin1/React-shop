import { useState, useContext, useEffect } from 'react'
import { ContentData } from '../../Contexts/Content'
import { myModal } from "../Modal";
import "./Basket.css"
import BasketItem from "./BasketItem"
import basketSvg from "../../img/basket.svg"

const Basket = () =>  {

    const { dataContent, basketItemId, setBasketItemId } = useContext(ContentData)

    const [showModal, setShowModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [basketItems, setBasketItems] = useState([]);

    const openBasket = () => {
        setShowModal(!showModal);
        document.body.style.overflow = "hidden"
    }

    const closeBasket = () => {
        setShowModal(false);
        document.body.style.overflow = "visible"
    }

    const clearBasket = () => {
        setBasketItems([]);
        setBasketItemId("");
    }

    const removeItem = (id) => {
        let arrWithoutItem = basketItems.filter((item)=>{return  item.id !==  id});
        setBasketItems(arrWithoutItem);
    }

    const quantityChange = (value,id) => {
        if(value > 100) {
            value = 99;
        }
        if(value < 1){
            value = 1;
        }

        setBasketItems(basketItems.map((item) => {
            return item.id === id ? { ...item, quantity: value } : item;
        }))
    }

    const quantityDeduct = (oldValue,id) => {
        quantityChange(oldValue - 1, id);
    }

    const quantityAdd = (oldValue,id) => {
        quantityChange(oldValue + 1, id);
    }

    const clickClearAll = () => {
        if(basketItems.length !== 0) {
            myModal({
                title: "",
                text: "Are you sure you want to remove all products from the basket?",
            })
            .then(clearBasket)
            .catch(() => {})
        }
    }

    const clickOrder = () => {
        if(basketItems.length !== 0) {
            myModal({
                title: "",
                text: "Sorry, but it is just a demo version",
                onlyOkBtn : true
              })
              .catch(() => {})
        }
        else {
            myModal({
                title: "",
                text: "Basket is empty :(",
                onlyOkBtn : true
              })
              .catch(() => {})
        }
    }

    const isAlreadyInBasket = (id) => {
        let isInBasket = false;
        basketItems.forEach(item => {
            if(item.id === id){
                isInBasket = true;
                return;
            }
        });
        return isInBasket;
    }

    const addItemToBasket = (id) => {
        let elem = "";
        for(let i = 0; i < dataContent.length; i++) {
            if(dataContent[i].id === id){
                elem = dataContent[i];
                break;
            }
        }
        setBasketItems(basketItems => [...basketItems, elem])
    }

    useEffect(() => {
        let total = 0;
        basketItems.forEach((item) => {
            total += (item.price * item.quantity);
        })
        total = total.toFixed(2).replace(/[.,]00$/, "");
        setTotalPrice(total);
    },[basketItems])

    useEffect(() => {
        if(basketItemId !== "") {
            //if varieble empty rhere is nothing to add to the basket
            if(isAlreadyInBasket(basketItemId)) {
                myModal({
                    title: "",
                    text: "It is already in the basket",
                    onlyOkBtn : true
                  })
                  .catch(() => {}) 
            }
            else {
                myModal({
                    title: "",
                    text: "Are you sure you want to add it to the basket?",
                    param : basketItemId
                })
                .then(addItemToBasket)
                .catch(() => {})  
            }
            setBasketItemId("")
        }
        
    },[basketItemId])

    return (
    <>
        <button className="btn-basket" onClick={openBasket}>
            <img className='basket-img' src={basketSvg} alt="Basket"/>
            <span className="basket-number">{basketItems.length}</span>
        </button>
        <div className={showModal ? "modal modal-basket_active":"modal"}>
            <div className={showModal ? "modal-block modal-block_active":"modal-block"}>
                <div className="modal-header">
                    <h3 className="modal-title">Products in the basket:</h3>
                    <button className="modal-close" onClick={closeBasket}>&times;</button>
                </div>
                <div className="modal-body basket-modal-block">
                    {
                        basketItems.length === 0 ? <p className="modal__empty-text">Basket is empty</p> : (basketItems.map((item)=> {
                            return (
                            <BasketItem 
                                key = {item.id}
                                id = {item.id}
                                name = {item.name}
                                image = {item.img}
                                price = {item.price}
                                quantity = {item.quantity}
                                onClickDelete = {removeItem}
                                onClickDeduct = {quantityDeduct}
                                onClickAdd = {quantityAdd}
                                onChangeQuantity = {quantityChange}
                            />)
                        }))
                    }
                </div>
                <div className="modal-footer">
                    <button className="btn-close btn-modal" onClick={closeBasket}>Close</button>
                    <button className="btn-clear btn-modal" onClick={clickClearAll}>Clear all</button>
                    <div className='total-block'>Total: <span className='total-block__price'>{totalPrice}$</span></div>
                    <button className="btn-order btn-modal" onClick={clickOrder}>Order</button>
                </div>
            </div>
            <div className="modal-bg" onClick={closeBasket}></div>
        </div>
    </>
  );
}

export default Basket;
