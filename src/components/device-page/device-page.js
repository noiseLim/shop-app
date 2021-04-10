import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import WithShopService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';
import {currentLogo} from '../../utils/currentLogo';

import './device-page.scss';

const DevicePage = ({ShopService}) => {

    const [product, setProduct] = useState({info:[]})
    // const dispatch = useDispatch();
    const loading = useSelector(state => state.productList.loading);
    const error = useSelector(state => state.productList.error);
    // const products = useSelector(state => state.productList.products);
    const {id} = useParams();

    useEffect(() => {
        // dispatch(productRequested())
        ShopService.getOneItem(id)
            // .then(res => dispatch(productLoaded(res)))
            .then(res => setProduct(res))
    }, [])

    if (loading) {
        return <Spinner/>
    }
    if (error) {
        return <Error/>
    }
    const {title, price, url, info, categoryId} = product;
    
    return (
        <>
            <div className="device__title">
                {title}
            </div>
            <div className="device__page">
                <Grid container>
                    <Grid item xs={4} className="device__img">
                        <img src={url} alt={title}></img>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid className="device__logo">
                            <img src={currentLogo(categoryId)} alt={title}></img>
                        </Grid>
                        <Grid className="device__price">
                            ${price}
                        </Grid>
                        <Grid className="device__info">
                            {info}
                        </Grid>
                        <Grid className="device__cart">
                            <button className="device__btn">Add to cart</button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
        
    )
}

export default WithShopService()(DevicePage);