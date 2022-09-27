import { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types'
import { ContentData } from '../../Contexts/Content';
import styles from "./Sidebar.module.css";
import SidebarItemCheckbox from "./Sidebar-checkbox-input";
import SidebarItemPrice from "./Sidebar-price";

const Sidebar = (props) =>  {

  const { setOptions } = props;

  const { dataContent } = useContext(ContentData);

  const [pricesMinMax, setPricesMinMax] = useState([0,100]);
  const [pricesMin, setPricesMin] = useState(pricesMinMax[0]);
  const [pricesMax, setPricesMax] = useState(pricesMinMax[1]);
  const [errorPrice, setErrorPrice] = useState(false);


  const [brands, setBrands] = useState([""]);
  const [chosenBrands, setChosenBrands] = useState([]);

  const findMinMax = (arr) => {
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
      else if (arr[i] > max) {
        max = arr[i];
      }
    }
    return [min, max]
  }

  const changePriceMin = (e) => {
    const newValue = Number(e.target.value);

    if(newValue <= 0){
      setErrorPrice(true);
    }
    else if (newValue > Number(pricesMax)) {
      setErrorPrice(true);
    }
    else {
      setErrorPrice(false);
    }
    setPricesMin(e.target.value);
  }

  const changePriceMax = (e) => {
    const newValue = Number(e.target.value);

    if(newValue <= 0){
      setErrorPrice(true);
    }
    else if (newValue < Number(pricesMin)) {
      setErrorPrice(true);
    }
    else {
      setErrorPrice(false);
    }
    setPricesMax(e.target.value);
  }

  const updatePrices = (e) => {
    e.preventDefault();
    
    if(!errorPrice) {
      setPricesMinMax([pricesMin, pricesMax]);
    }
  }

  const updateBrands = (item) => {
    let newArray = [...chosenBrands, item];
    if (chosenBrands.includes(item)) {
      newArray = newArray.filter(brand => brand !== item);
    }
    setChosenBrands(newArray);
  }

  useEffect(() => {
    const initCategory = () =>  {
      const brandsInit = [];
      const pricesInit = [];
      dataContent.forEach((item) => {
        if(!brandsInit.includes(item.brand)){
          brandsInit.push(item.brand);
        }
        pricesInit.push(item.price);
      })
      setBrands(brandsInit);
      const minMax = findMinMax(pricesInit);
      setPricesMin(minMax[0]);
      setPricesMax(minMax[1]);
      setPricesMinMax(minMax);
    }
    
    if(dataContent.length !== 0){
      initCategory();
    }
  }, [dataContent])

  useEffect(() => {
    setOptions({
      price : {
        min : pricesMinMax[0],
        max : pricesMinMax[1]
      },
      brands : chosenBrands
    });
  }, [pricesMinMax, chosenBrands, setOptions])

  return (
    <div className={styles.sidebar}>
        <SidebarItemCheckbox 
          title = "Brands"
          items = {brands}
          onChange = {updateBrands}
        />
        <SidebarItemPrice 
          title = "Price"
          minPrice = {pricesMin}
          onChangeMin = {changePriceMin}
          maxPrice = {pricesMax}
          onChangeMax = {changePriceMax}
          onSubmit = {updatePrices}
          error = {errorPrice}
        />
    </div>
  );
}

Sidebar.propTypes = {
  setOptions : PropTypes.func,
}

export default Sidebar;
