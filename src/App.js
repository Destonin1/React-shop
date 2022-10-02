import { HashRouter, Routes, Route } from "react-router-dom";
import { ContentData } from './Contexts/Content';
import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import { ApiKeyShop, ApiFirebaseConfig } from "./config"

function App() {

  const [ dataContent, setDataContent ] = useState([])
  const [ basketItemId, setBasketItemId ] = useState("")

  const handleResponse = (response) => {

    setDataContent(
      response.products.map((item) => {
        return {
          id: item.id,
          name: item.name,
          img: item.imageUrl,
          colour: item.colour,
          price: item.price.current.value,
          brand: item.brandName,
          quantity: 1,
        }
      })
    )
  }

  useEffect(() => {

    const fetchData = () => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': ApiKeyShop,
          'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
      };
  
      fetch('https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4208&limit=9&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US', options)
        .then(response => response.json())
        .then(response => {
          handleResponse(response);
        })
        .catch(err => console.error(err));
    }

    if (dataContent.length === 0) {
      fetchData();
    }
  },[dataContent.length]);
  
  const FirebaseApp = initializeApp(ApiFirebaseConfig);

  return (
    <div>
      <ContentData.Provider value={{ dataContent, setDataContent, basketItemId, setBasketItemId, FirebaseApp }}>
        <HashRouter>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/catalog" element={<Catalog/>}/>
              <Route path="/about" element={<About/>}/>
          </Routes>
        </HashRouter>
      </ContentData.Provider>
    </div>
  );
}

export default App;
