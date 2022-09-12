import PropTypes from 'prop-types'
import "./Loader.css";

const Loader = (props) =>  {
    const isGray = props.isGray;

    return (
        <div className={ isGray ? "loader-container gray-loader" : "loader-container"}>
            <div className="loader-1"></div>
        </div> 
        
    );
}

Loader.propTypes = {
    isGray : PropTypes.bool
}
  
export default Loader;