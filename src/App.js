import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentData } from './Contexts/Content';
import { useState, useEffect } from 'react'
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';

function App() {

  const [ dataContent, setDataContent ] = useState([])
  const [ basketItemId, setBasketItemId ] = useState("")

  const fetchData = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'fd31333ffbmsha35464cd623f299p1bb0d6jsn8e9b07814618',
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
    if (dataContent.length === 0) {
      fetchData();
    }
  },[]);

  return (
    <div>
      <ContentData.Provider value={{ dataContent, setDataContent, basketItemId, setBasketItemId }}>
        <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/catalog" element={<Catalog/>}/>
              <Route path="/about" element={<About/>}/>
          </Routes>
        </BrowserRouter>
      </ContentData.Provider>
    </div>
  );
}

export default App;
