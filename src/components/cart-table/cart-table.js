import React from 'react';
import { useSelector } from 'react-redux';
// import {useHistory} from 'react-router-dom';

// import { DEVICE_ROUTE } from '../../utils/consts';


const CartTable = () => {

    const items = useSelector(state => state.cartTable.items);

    // const history = useHistory();
    if (items.length === 0) {
        return (
            <div>Your shopping cart is empty</div>
        )
    }

    return (
        []
        // <li 
        //     className="product__item_current">
        //     <div className="product__img_wrapper_current">
        //         <img className="product__img_current" src={url} alt={title}></img>
        //     </div>
        //     <div className="product__info_wrapper">
        //         <div 
        //             className="product__title_current" 
        //             // onClick={() => history.push(DEVICE_ROUTE + '/' + productItem.id)}
        //             >
        //             {title}
        //         </div>
        //         <div className="product__info_current">{info}</div>
        //     </div>
        //     <div className="product__btn_wrapper_current">
        //         <div className="product__price_current">{price}$</div>
        //         <button className="product__btn_current">Add to cart</button>
        //     </div>
        // </li>
    )
}

export default CartTable;