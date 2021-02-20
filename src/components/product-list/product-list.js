import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';

import WithShopService from '../hoc';
import {productLoaded, productRequested, productError, setCurrentPage, getTotalCount} from './product-list-slice';
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
    const listView = useSelector(state => state.sortPanel.listView);
    const loading = useSelector(state => state.productList.loading);
    const error = useSelector(state => state.productList.error);
    const pages = []

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

    const View =({items}) => {
        return (
            <Grid 
                container
                direction={listView ? "column" : "row"}
                justify="space-between"
                alignItems={listView ? "stretch" : "flex-start"} 
                className="product__list">
                {items}
            </Grid>
        )
    }

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

export default WithShopService()(ProductList);