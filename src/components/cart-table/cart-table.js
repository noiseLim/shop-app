import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { DEVICE_ROUTE } from '../../utils/consts';
import {addedCountToMinus, addedCountToPlus, removeFromCart} from '../product-list/product-list-slice';

import './cart-table.scss';

const CartTable = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const items = useSelector(state => state.productList.items);
    const totalPrice = useSelector(state => state.productList.totalPrice);
    const totalQuantityProducts = useSelector(state => state.productList.totalQuantityProducts);
    
    if (items.length === 0) {
        return (
            <Grid container xs={12}>
                <Grid item xs={9}>
                    <Grid className="cart__empty">
                        Your shopping cart is empty
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid className="cart__empty">
                        Your shopping cart is empty
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    return (
        <Grid container xs={12} className="cart__page">
            <Grid container xs={8}>
                {
                    items.map(item => {
                        const {title, url, price, id, qtty} = item;
                        return (
                            <Grid container xs={12} key={id} className="cart__item">
                                <Grid item xs={3} className="cart__img_wrapper">
                                    <img className="cart__img" src={url} alt={title}></img>
                                </Grid>
                                <Grid container xs={5}>
                                    <Grid item
                                        xs={12}
                                        className="cart__title" 
                                        onClick={() => history.push(DEVICE_ROUTE + '/' + item.id)}>
                                        {title}
                                    </Grid>
                                    <Grid item xs={12} className="cart__remove">
                                        <DeleteForeverIcon onClick={() => dispatch(removeFromCart(id))}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} className="cart__count">
                                    <button 
                                        className="cart__count_button_minus"
                                        onClick={() => dispatch(addedCountToMinus(id))}>
                                        <RemoveIcon/>
                                    </button>
                                    <div className="cart__count_qtty">{qtty}</div>
                                    <button 
                                        className="cart__count_button_plus"
                                        onClick={() => dispatch(addedCountToPlus(id))}>
                                        <AddIcon/>
                                    </button>
                                </Grid>
                                <Grid item xs={2} className="cart__price">
                                    ${price}
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid container xs={4}>
                <Grid container xs={12} className="cart__total">
                    <Grid item xs={6} className="cart__total_left">
                        {`Item (${totalQuantityProducts})`}
                    </Grid>
                    <Grid item xs={6} className="cart__total_right">
                        {`US $${totalPrice}`}
                    </Grid>
                    <Grid item xs={12} className="cart__btn_cart_wrap">
                        <Grid item xs={12} className="cart__btn_cart"
                            onClick={(e) => {
                                e.preventDefault();
                            }}>
                            Place an order
                        </Grid>
                    </Grid>
                    
                </Grid>
                
            </Grid>
        </Grid>
    )
}

export default CartTable;