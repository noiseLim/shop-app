import React from 'react';

import './product-list-item.scss';

const ProductListItem = ({productItem}) => {

    const {title, price, url, info} = productItem;

    return (
        <li className="product__item">
            {/* <Link to = {`/${productItem.id}`}> */}
            <div className="product__title">{title}</div>
            <div className="product__img_wrapper">
                <img className="product__img" src={url} alt={title}></img>
            </div>
            <div className="product__info"><span>{info}</span> {price}$</div>
            <button className="product__btn">Add to cart</button>
            {/* </Link>       */}
        </li>
    )
}
export default ProductListItem;