import PropTypes from 'prop-types'
import Loader from "../Loader";

const SidebarItemCheckbox = (props) =>  {

    const {title, items, onChange} = props;

    return (
        <div className="sidebar__item">
            <h3 className="sidebar__item-title">{title}</h3>
            <form className="sidebar__form sidebar__form-checkbox">
            {
                items.length === 0 ?
                    <Loader />
                    
                    :items.map((item, index) => (
                    <div className="sidebar__form-item" key={index}>
                        <input className="sidebar__input" id={item + index} type="checkbox" onClick={() => {onChange(item)}} name={item}></input>
                        <label className="sidebar__label" htmlFor={item + index}>{item}</label>
                    </div>
                )
                )
            }
            </form>
        </div>
    );
}

SidebarItemCheckbox.propTypes = {
    title : PropTypes.string,
    items : PropTypes.arrayOf(PropTypes.string),
    onChange : PropTypes.func
}
  
export default SidebarItemCheckbox;
  