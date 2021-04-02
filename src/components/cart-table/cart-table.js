import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import { DEVICE_ROUTE } from '../../utils/consts';
import {addedCountToMinus, addedCountToPlus} from '../product-list/product-list-slice';

import './cart-table.scss';

const CartTable = () => {

    const items = useSelector(state => state.productList.items);
    const history = useHistory();
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <>
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
            </>
            
        )
    }
    return (
        <Grid item xs={9} className="cart__page">
            {
                items.map(item => {
                    const {title, url, price, id, qtty} = item;
                    return (
                        <Grid item xs={12} key={id} className="cart__item">
                            <Grid xs={3} className="cart__img_wrapper">
                                <img className="cart__img" src={url} alt={title}></img>
                            </Grid>
                            <Grid 
                                xs={5}
                                className="cart__title" 
                                onClick={() => history.push(DEVICE_ROUTE + '/' + item.id)}>
                                {title}
                            </Grid>
                            <Grid xs={2} className="cart__count">
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
                            <Grid xs={2} className="cart__price">
                                {price} $
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default CartTable;