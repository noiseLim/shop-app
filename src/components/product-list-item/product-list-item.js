import React from 'react';

import './product-list-item.scss';

const ProductListItem = ({productItem}) => {

    const {title, price, url, info} = productItem;

    return (
        <li className="product__item">
            {/* <Link to = {`/${productItem.id}`}> */}
            <div className="product__img_wrapper">
                <img className="product__img" src={url} alt={title}></img>
            </div>
            <div className="product__title">{title}</div>
            <div className="product__info">{info}</div>
            <div className="product__btn_wrapper">
                <button className="product__btn">Add to cart</button>
                <div className="product__price">{price}$</div>
            </div>
            {/* </Link>       */}
        </li>
    )
}
export default ProductListItem;