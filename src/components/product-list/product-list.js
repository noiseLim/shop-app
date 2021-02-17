import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import WithShopService from '../hoc';
import {productLoaded, productRequested, productError} from './productListSlice';
import Error from '../error';
import Spinner from '../spinner';
import ProductListItem from '../product-list-item';

import './product-list.scss';


const ProductList = ({ShopService}) => {

    const dispatch = useDispatch();

    const productItems = useSelector(state => state.productList.products);
    const loading = useSelector(state => state.productList.loading);
    const error = useSelector(state => state.productList.error);

    useEffect(() => {
        dispatch(productRequested());
        ShopService.getProductItems()
            .then(res => dispatch(productLoaded(res)))
            .catch(error => dispatch(productError()))
    }, [])

    if (loading) {
        return <Spinner/>
    }
    if (error) {
        return <Error/>
    }

    const items = productItems.map(productItem => {
        return <ProductListItem
        key={productItem.id}
        productItem={productItem}/>
    })

    return (
        <View items={items}/>
    )
}

const View =({items}) => {
    return(
        <ul className="product__list">
            {items}
        </ul>
    )
}

export default WithShopService()(ProductList);