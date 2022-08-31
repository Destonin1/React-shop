import { useContext } from "react";
import { ContentData } from '../Contexts/Content';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Product from '../components/Product';
import Loader from "../components/Loader";

const Home = () =>  {

  const { dataContent } = useContext(ContentData)

  return (
    <>
        <Header />
        <section>
          <div className="container">
              <div className='section-content'>
                  <h2 className="section-title">New <span className="title-span">arrivals</span></h2>
                  <div className="new-block">
                  {
                    dataContent.length === 0 ?
                      <Loader 
                        isGray = {true}
                      /> 
                      :dataContent.slice(0,4).map((item) => {
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
                    })
                  }
                  </div>
              </div>
          </div>
        </section>
        <Footer />
    </> 
  );
}

export default Home;
