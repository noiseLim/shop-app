import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

import { DEVICE_ROUTE } from '../../utils/consts';

import './product-list-item.scss';

const ProductListItem = ({ productItem, onAddToCart }) => {
  const { title, price, url, info } = productItem;

  const history = useHistory();
  const listView = useSelector((state) => state.sortPanel.listView);

  const [btnView, setBtnView] = useState(false);

  const onBtnView = () => {
    setBtnView(true);
  };

  return listView ? (
    <li className='product__item_current'>
      <div className='product__img_wrapper_current'>
        <img className='product__img_current' src={url} alt={title}></img>
      </div>
      <div className='product__info_wrapper'>
        <div
          className='product__title_current'
          onClick={() => history.push(DEVICE_ROUTE + '/' + productItem.id)}
        >
          {title}
        </div>
        <div className='product__info_current'>{info}</div>
      </div>
      <div className='product__btn_wrapper_current'>
        <div className='product__price_current'>${price}</div>
        <button
          className='product__btn_current'
          onClick={(e) => {
            e.preventDefault();
            onAddToCart();
            onBtnView();
          }}
        >
          {btnView ? (
            <div className='product__btn_change'>
              <CheckIcon />
            </div>
          ) : (
            <div className='product__btn_change'>Add to cart</div>
          )}
        </button>
      </div>
    </li>
  ) : (
    <li className='product__item'>
      <div className='product__img_wrapper'>
        <img className='product__img' src={url} alt={title}></img>
      </div>
      <div>
        <div
          className='product__title'
          onClick={() => history.push(DEVICE_ROUTE + '/' + productItem.id)}
        >
          {title}
        </div>
        <div className='product__info'>{info}</div>
      </div>
      <div className='product__btn_wrapper'>
        <div className='product__price'>${price}</div>
        <button
          className='product__btn'
          onClick={(e) => {
            e.preventDefault();
            onAddToCart();
            onBtnView();
          }}
        >
          {btnView ? (
            <div className='product__btn_change'>
              <CheckIcon />
            </div>
          ) : (
            <div className='product__btn_change'>Add to cart</div>
          )}
        </button>
      </div>
    </li>
  );
};
export default ProductListItem;
