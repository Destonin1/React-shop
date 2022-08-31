import { useState, useContext } from "react";
import { ContentData } from '../Contexts/Content';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Product from '../components/Product';
import Loader from "../components/Loader";

const Catalog = () =>  {

  const { dataContent } = useContext(ContentData);

  const [sidebarOptions, setSidebarOptions] = useState({});

  const optionFilter = (item) => {
    if(Object.keys(sidebarOptions).length === 0){
      return false;
    }
    if(sidebarOptions.price.min !== "" || sidebarOptions.price.max !== "") {
      if(item.price < sidebarOptions.price.min || item.price > sidebarOptions.price.max) {
        return false
      }
    }
    if(sidebarOptions.brands.length !== 0 && !sidebarOptions.brands.includes(item.brand)){
      return false;
    }
    return true
  }

  return (
    <>
        <Header />
        <section>
          <div className="container">
              <div className='section-content'>
                  <h2 className="section-title">Shopy <span className="title-span"> catalog</span></h2>
                  <div className="catalog-block">
                    <Sidebar setOptions = {setSidebarOptions}/>
                    
                    {
                      dataContent.length === 0 ?
                      <Loader 
                        isGray = {true}
                      /> 
                        :<div className='products-wrap'> 
                        {dataContent.filter(optionFilter).map((item) => {
                        return (
                          <Product
                            key = {item.id}
                            id = {item.id}
                            image = {item.img}
                            name = {item.name}
                            price = {item.price}
                            brand = {item.brand}
                          />
                        )
                      })}
                      </div>
                    }
                    
                  </div>
              </div>
          </div>
        </section>
        <Footer />
    </>
    
  );
}

export default Catalog;