import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import WithShopService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';

import './device-page.scss';

const DevicePage = ({ShopService}) => {

    const [products, setProducts] = useState({info:[]})
    // const dispatch = useDispatch();
    const loading = useSelector(state => state.productList.loading);
    const error = useSelector(state => state.productList.error);
    // const products = useSelector(state => state.productList.products);
    const {id} = useParams();

    useEffect(() => {
        // dispatch(productRequested())
        ShopService.getOneItem(id)
            // .then(res => dispatch(productLoaded(res)))
            .then(res => setProducts(res))
    }, [])
    console.log(products);
    console.log(products.title);
    console.log(id);

    if (loading) {
        return <Spinner/>
    }
    if (error) {
        return <Error/>
    }
    
    return (
        <div className="device__page">
            {products.title}
        </div>
    )
}

export default WithShopService()(DevicePage);