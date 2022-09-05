import { useState, useEffect, useContext } from "react";
import { ContentData } from '../../Contexts/Content';
import "./Sidebar.css";
import SidebarItemCheckbox from "./Sidebar-checkbox-input";
import SidebarItemPrice from "./Sidebar-price";

const Sidebar = (props) =>  {

  const { setOptions } = props;

  const { dataContent } = useContext(ContentData);

  const [pricesMinMax, setPricesMinMax] = useState([0,100]);

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
    setPricesMinMax(findMinMax(pricesInit))
  }

  const updatePriceMin = (e) => {
    let newPrice = 0;
    if(e.target.value !== ""){
      if(e.target.value > pricesMinMax[1]) {
        newPrice = pricesMinMax[1];
      }
      else {
        newPrice = e.target.value;
      }
    }
    setPricesMinMax((prevState)=> {
      return [newPrice, prevState[1]]
    });
  }

  const updatePriceMax = (e) => {
    let newPrice = 0;
    if(e.target.value < pricesMinMax[0]){
      newPrice = pricesMinMax[0];
    }
    else {
      newPrice = e.target.value;

    }
    setPricesMinMax((prevState)=> {
      return [prevState[0], newPrice]
    });
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
          minPrice = {pricesMinMax[0]}
          onChangeMin = {updatePriceMin}
          maxPrice = {pricesMinMax[1]}
          onChangeMax = {updatePriceMax}
        />
    </div>
  );
}

export default Sidebar;
