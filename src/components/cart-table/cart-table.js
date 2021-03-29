import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

// import {useHistory} from 'react-router-dom';

// import { DEVICE_ROUTE } from '../../utils/consts';
import './cart-table.scss';


const CartTable = () => {

    const items = useSelector(state => state.cartTable.items);

    // const history = useHistory();
    if (items.length === 0) {
        return (
            <>

                <Grid className="cart__page">
                    Your shopping cart is empty
                </Grid>

                <Grid className="cart__wrapper">
                    <Grid className="cart__page">
                        Your shopping cart is empty
                    </Grid>
                </Grid>
            </>
            
        )
    }

    return (
        <div className="cart__page">
            <Grid container>

            </Grid>
        </div>
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