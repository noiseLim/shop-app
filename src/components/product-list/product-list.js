import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';

import WithShopService from '../hoc';
import {productLoaded, productRequested, productError, setCurrentPage, getTotalCount} from './productListSlice';
import Error from '../error';
import Spinner from '../spinner';
import ProductListItem from '../product-list-item';
import createPages from '../utils';

import './product-list.scss';


const ProductList = ({ShopService}) => {

    const dispatch = useDispatch();

    const productItems = useSelector(state => state.productList.products);
    const currentPage = useSelector(state => state.productList.currentPage);
    const totalCount = useSelector(state => state.productList.totalCount);
    const limitPage = useSelector(state => state.productList.limitPage);
    const loading = useSelector(state => state.productList.loading);
    const pages = []
    const error = useSelector(state => state.productList.error);

    const pagesCount = Math.ceil(totalCount/limitPage)
    createPages(pages, pagesCount, currentPage);

    useEffect(() => {
        dispatch(productRequested());
        ShopService.getProductItems(currentPage, limitPage)
            .then(res => dispatch(productLoaded(res)))
            .catch(error => dispatch(productError()))
    }, [currentPage])

    useEffect(() => {
        ShopService.getTotalCount()
            .then(res => dispatch(getTotalCount(res)))
            .catch(error => dispatch(productError()))
    }, [currentPage])

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
        <>
            <View items={items}/>
            <div className="product__pages">
                {pages.map((page, index) => <span
                key={index} 
                className={currentPage === page ? "product__page_current" : "product__page"}
                onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
        </>
    )
}

const View =({items}) => {
    return (
        // <ul className="product__list">
        //     {items}
        // </ul>
        <Grid 
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start" 
            className="product__list">
            {items}
        </Grid>
    )
}

export default WithShopService()(ProductList);