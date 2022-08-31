import { useContext } from "react";
import { ContentData } from '../Contexts/Content';
import "./Product.css";

const Product = (props) =>  {

    const { id, image, name, price, brand } = props;

    const { setBasketItemId } = useContext(ContentData)

    const buyClick = (e) => {
        const id = Number(e.currentTarget.id);
        setBasketItemId(id);
    }

  return (
    <div className="product">
        <div className="product__front">
            <img className="product__image" src={"https://" + image} alt="jeans"/>
            <p className="product__name">{name}</p>
            <span className="product__price">{price}$</span>
        </div>
        <div className="product__hover">
            <img className="product__image_hover" src={"https://" + image} alt="jacket"/>
            <p className="product__name product__name_hover">{name}</p>
            <div className="product__brand-block">
                <span className="product__brand">Brand: {brand}</span>
            </div>
            <div className="product__buy-block">
                <span className="product__price">{price}$</span>
                <button className="product__buy-btn" id={id} onClick={buyClick}>
                    <svg className="product__buy-img" alt="buy" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26 26">
                        <g className="product__buy-img-fill">
                            <path d="M25.856,10.641C21.673,19.5,20.312,19.5,19.5,19.5h-8c-2.802,0-4.949-1.648-5.47-4.2
                                c-0.016-0.078-1.6-7.853-2.005-10.025C3.826,4.21,3.32,3.5,1.5,3.5C0.671,3.5,0,2.829,0,2s0.671-1.5,1.5-1.5
                                c3.02,0,4.964,1.5,5.474,4.224c0.401,2.149,1.98,9.898,1.996,9.977c0.319,1.566,1.722,1.8,2.53,1.8h7.605
                                c0.817-0.878,2.679-4.261,4.038-7.141c0.354-0.749,1.249-1.068,1.997-0.716C25.89,8.997,26.21,9.891,25.856,10.641z M10.5,20.5
                                C9.119,20.5,8,21.619,8,23s1.119,2.5,2.5,2.5S13,24.381,13,23S11.881,20.5,10.5,20.5z M19.5,20.5c-1.381,0-2.5,1.119-2.5,2.5
                                s1.119,2.5,2.5,2.5S22,24.381,22,23S20.881,20.5,19.5,20.5z M14.663,12.344c0.1,0.081,0.223,0.12,0.346,0.12
                                s0.244-0.039,0.346-0.12c0.1-0.079,2.828-2.74,4.316-4.954c0.115-0.172,0.126-0.392,0.028-0.574
                                c-0.095-0.181-0.285-0.295-0.49-0.295h-2.226c0,0-0.217-4.291-0.359-4.49c-0.206-0.294-1.057-0.494-1.616-0.494
                                c-0.561,0-1.427,0.2-1.634,0.494c-0.141,0.198-0.328,4.49-0.328,4.49h-2.255c-0.206,0-0.395,0.114-0.492,0.295
                                c-0.097,0.182-0.086,0.403,0.028,0.574C11.816,9.605,14.564,12.265,14.663,12.344z"
                            />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    </div>
  );
}

export default Product;
