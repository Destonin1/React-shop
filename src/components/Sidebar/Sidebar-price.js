const SidebarItemPrice = (props) =>  {

    const {title, minPrice, onChangeMin, maxPrice, onChangeMax} = props;

    return (
        <div className="sidebar__item">
            <h3 className="sidebar__item-title">{title}</h3>
            <form className="sidebar__form sidebar__form-price">
                <label className="sidebar__input-label">Minimum:</label>
                <input className="sidebar__input-number" type="number" onChange = {onChangeMin} value={minPrice} name="min"/>
                <span className="sidebar__input-currency">$</span>
                <label className="sidebar__input-label">Maximum:</label>
                <input className="sidebar__input-number" type="number" onChange = {onChangeMax} value={maxPrice} name="max"/>
                <span className="sidebar__input-currency">$</span>
            </form>
        </div>
    );
  }
  
  export default SidebarItemPrice;
  