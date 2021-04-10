import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';

import { DEVICE_ROUTE } from '../../utils/consts';

import './product-list-item.scss';

const ProductListItem = ({productItem, onAddToCart}) => {

    const {title, price, url, info} = productItem;

    const history = useHistory();
    const listView = useSelector(state => state.sortPanel.listView);

    const [btnView, setBtnView] = useState(false);

    const onBtnView = () => {
        setBtnView(true);
    }

    return (
        <li className={listView ? "product__item_current" : "product__item"}>
            <div className={listView ? "product__img_wrapper_current" : "product__img_wrapper"}>
                <img className={listView ? "product__img_current" : "product__img"} src={url} alt={title}></img>
            </div>
            <div className={listView ? "product__info_wrapper" : ''}>
                <div 
                    className={listView ? "product__title_current" : "product__title"} 
                    onClick={() => history.push(DEVICE_ROUTE + '/' + productItem.id)}>
                    {title}
                </div>
                <div className={listView ? "product__info_current" : "product__info"}>{info}</div>
            </div>
            <div className={listView ? "product__btn_wrapper_current" : "product__btn_wrapper"}>
                <div className={listView ? "product__price_current" : "product__price"}>${price}</div>
                <button 
                    className={listView ? "product__btn_current" : "product__btn"}
                    onClick={(e) => {
                        e.preventDefault();
                        onAddToCart();
                        onBtnView();
                    }}>
                    {btnView
                    ?
                    <div className="product__btn_change">
                        <CheckIcon/>
                    </div>
                    :
                    <div className="product__btn_change">
                        Add to cart
                    </div>
                    }
                </button>
            </div>
        </li>
    )
}
export default ProductListItem;