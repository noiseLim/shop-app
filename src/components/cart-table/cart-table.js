import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { FormControlLabel, Icon, RadioGroup } from '@material-ui/core';

import { DEVICE_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import {addedCountToMinus, addedCountToPlus, removeFromCart, cleanCartAfterOrder, addedAdditionalWarranties12Month, addedAdditionalWarranties24Month, addedAdditionalWarrantiesNo} from '../product-list/product-list-slice';
import WithShopService from '../hoc';
import AnimationCat from '../../utils/animation-cat';

import './cart-table.scss';

const CartTable = ({ShopService}) => {

    const [selectedValue, setSelectedValue] = useState('No add warranty');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const history = useHistory();
    const dispatch = useDispatch();

    const items = useSelector(state => state.productList.items);
    const totalPrice = useSelector(state => state.productList.totalPrice);
    const totalQuantityProducts = useSelector(state => state.productList.totalQuantityProducts);

    const GreenRadio = withStyles({
        root: {
            color: '#ababab',
            '&$checked': {
                color: 'rgb(41, 167, 69)',
            },
          },
          checked: {},
    })((props) => <Radio color="default" {...props} />);
    
    if (items.length === 0) {
        return (
            <Grid container className="cart__empty">
                <Grid item xs={6}>
                    <AnimationCat/>
                </Grid>
                <Grid item xs={12} className="cart__empty_item">
                    Your shopping cart is empty
                </Grid>
                <Grid item xs={3} className="cart__btn_cart" onClick={() => history.push(SHOP_ROUTE)}>
                    Go back to the main page
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
                                {/* <Grid container xs={12}>
                                    <RadioGroup row aria-label="warranty" name="warranty1" value={selectedValue} onChange={handleChange}>
                                        <FormControlLabel 
                                            value="Add warranty" control={<Icon />} label="Add warranty:" />
                                        <FormControlLabel 
                                            value="No add warranty" control={<GreenRadio />} label="No add warranty" 
                                            onChange={() => dispatch(addedAdditionalWarrantiesNo(id))} />
                                        <FormControlLabel 
                                            value="+ 12 month" control={<GreenRadio />} label={`+12 month ($${(price * 0.05).toFixed(2)})`}
                                            onChange={() => dispatch(addedAdditionalWarranties12Month(id))} />
                                        <FormControlLabel 
                                            value="+ 24 month" control={<GreenRadio />} label={`+24 month ($${(price * 0.1).toFixed(2)})`}
                                            onChange={() => dispatch(addedAdditionalWarranties24Month(id))} />
                                    </RadioGroup>
                                </Grid> */}
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid container xs={4}>
                <Grid container xs={12} className="cart__total">
                    <Grid item xs={6} className="cart__total_left">
                        {totalQuantityProducts > 1 ? `Items (${totalQuantityProducts})` : `Item (${totalQuantityProducts})`}
                    </Grid>
                    <Grid item xs={6} className="cart__total_right">
                        {`US $${totalPrice}`}
                    </Grid>
                    <Grid item xs={6} className="cart__total_left">
                        Shipping
                    </Grid>
                    <Grid item xs={6} className="cart__total_right">
                        Free
                    </Grid>
                    <div className="cart__line">
                        <hr className="cart__line_x"></hr>
                    </div>
                    <Grid container className="cart__subtotal">
                        <Grid item xs={6} className="cart__total_left">
                            Subtotal
                        </Grid>
                        <Grid item xs={6} className="cart__total_right">
                            {`US $${totalPrice}`}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="cart__btn_cart_wrap">
                        <Grid item xs={12} className="cart__btn_cart"
                            onClick={() => {
                                dispatch(cleanCartAfterOrder(ShopService.setOrder(generateOrder(items))));
                            }}>
                            Place an order
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            qtty: item.qtty
        }
    })
    return newOrder;
}

export default WithShopService()(CartTable);