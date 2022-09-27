import { useState, useContext, useEffect, useCallback } from 'react'
import { ContentData } from '../../Contexts/Content'
import { myModal } from "../Modal";
import styles from "./Basket.module.css"
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
        sessionStorage.removeItem('basketItems');
    }

    const removeItem = (id) => {
        let arrWithoutItem = basketItems.filter((item)=>{return  item.id !==  id});
        setBasketItems(arrWithoutItem);
        const LSBasketItems = JSON.parse(sessionStorage.getItem('basketItems'));
        if(LSBasketItems !== null) {
            let arrWithoutItemIds = [];
            for(let i = 0; i < arrWithoutItem.length; i++) {
                arrWithoutItemIds.push(arrWithoutItem[i].id)
            }
            sessionStorage.setItem('basketItems', JSON.stringify(arrWithoutItemIds));
        }
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

    const isAlreadyInBasket = useCallback((id) => {
        let isInBasket = false;
        basketItems.forEach(item => {
            if(item.id === id){
                isInBasket = true;
                return;
            }
        });
        return isInBasket;
    }, [basketItems])

    const addItemToBasket = useCallback((id) => {
        let newItemBasket = "";
        for(let i = 0; i < dataContent.length; i++) {
            if(dataContent[i].id === id){
                newItemBasket = dataContent[i];
                break;
            }
        }
        addItemToSessionStorage(newItemBasket.id)
        
        setBasketItems(basketItems => [...basketItems, newItemBasket])

    }, [dataContent])

    const addItemToSessionStorage = (newItem) => {
        const LSBasketItems = JSON.parse(sessionStorage.getItem('basketItems'));
        if(LSBasketItems === null) {
            sessionStorage.setItem('basketItems', JSON.stringify([newItem]));
        }
        else {
            LSBasketItems.push(newItem)
            sessionStorage.setItem('basketItems', JSON.stringify(LSBasketItems, newItem)); 
        }
    }

    useEffect(() => {
        const ItemsFromLS = JSON.parse(sessionStorage.getItem('basketItems'))
        if(ItemsFromLS !== null && basketItems.length === 0) {
            for(let i = 0; i < dataContent.length; i++) {
                if(ItemsFromLS.includes(dataContent[i].id)){
                    setBasketItems(basketItems => [...basketItems, dataContent[i]])
                }
            }
        }
    },[dataContent])

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
        
    },[basketItemId, isAlreadyInBasket, addItemToBasket, setBasketItemId])

    return (
    <>
        <button className={styles.btnBasket} onClick={openBasket}>
            <img className={styles.basketImg} src={basketSvg} alt="Basket"/>
            <span className={styles.number}>{basketItems.length}</span>
        </button>
        <div className={showModal ? `${styles.modal} ${styles.modalActive}` : styles.modal}>
            <div className={showModal ? `${styles.block} ${styles.blockActive}` : styles.block}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Products in the basket:</h3>
                    <button className={styles.close} onClick={closeBasket}>&times;</button>
                </div>
                <div className={styles.body}>
                    {
                        basketItems.length === 0 ? <p className={styles.empty}>Basket is empty</p> : (basketItems.map((item)=> {
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
                <div className={styles.footer}>
                    <button className={`${styles.btnClose} ${styles.btn}`} onClick={closeBasket}>Close</button>
                    <button className={`${styles.clear} ${styles.btn}`} onClick={clickClearAll}>Clear all</button>
                    <div className={styles.total}>Total: <span className={styles.price}>{totalPrice}$</span></div>
                    <button className={`${styles.order} ${styles.btn}`} onClick={clickOrder}>Order</button>
                </div>
            </div>
            <div className={styles.bg} onClick={closeBasket}></div>
        </div>
    </>
  );
}

export default Basket;
