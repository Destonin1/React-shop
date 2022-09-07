import { useState, useEffect, useContext } from "react";
import { ContentData } from '../../Contexts/Content';
import "./Sidebar.css";
import SidebarItemCheckbox from "./Sidebar-checkbox-input";
import SidebarItemPrice from "./Sidebar-price";

const Sidebar = (props) =>  {

  const { setOptions } = props;

  const { dataContent } = useContext(ContentData);

  const [pricesMinMax, setPricesMinMax] = useState([0,100]);
  const [pricesMin, setPricesMin] = useState(pricesMinMax[0]);
  const [pricesMax, setPricesMax] = useState(pricesMinMax[1]);

  const [brands, setBrands] = useState("");
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

  const changePriceMin = (e) => {
    setPricesMin(e.target.value);
  }

  const changePriceMax = (e) => {
    setPricesMax(e.target.value);
  }

  const updatePrices = (e) => {
    e.preventDefault();

    let newPriceMin = 0;
    if(pricesMin !== ""){
      if(pricesMin > pricesMax) {
        newPriceMin = pricesMax;
      }
      else {
        newPriceMin = pricesMin;
      }
    }

    let newPriceMax = 0;
    if(pricesMax < pricesMinMax[0]){
      newPriceMax = pricesMinMax[0];
    }
    else {
      newPriceMax = pricesMax;

    }
    
    setPricesMinMax([newPriceMin, newPriceMax]);
  }

  const updateBrands = (item) => {
    let newArray = [...chosenBrands, item];
    if (chosenBrands.includes(item)) {
      newArray = newArray.filter(brand => brand !== item);
    }
    setChosenBrands(newArray);
  }

  useEffect(() => {
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
  }, [pricesMinMax, chosenBrands])

  return (
    <div className="sidebar">
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
        />
    </div>
  );
}

export default Sidebar;
