import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Pagination from '@mui/material/Pagination';

import {
  productLoaded,
  productRequested,
  productError,
  setCurrentPage,
  getTotalCount,
  addedToCart,
  // setBtnView,
} from './product-list-slice';
import Error from '../error';
import Spinner from '../spinner';
import ProductListItem from '../product-list-item';
import { Context } from '../..';

import './product-list.scss';

const ProductList = () => {
  const [searchValue] = useState('');
  const dispatch = useDispatch();
  const ShopService = useContext(Context);

  const productItems = useSelector((state) => state.productList.products);
  const currentPage = useSelector((state) => state.productList.currentPage);
  const totalCount = useSelector((state) => state.productList.totalCount);
  const limitPage = useSelector((state) => state.productList.limitPage);
  const loading = useSelector((state) => state.productList.loading);
  const error = useSelector((state) => state.productList.error);
  const listView = useSelector((state) => state.sortPanel.listView);

  const pagesCount = Math.ceil(totalCount / limitPage);

  useEffect(() => {
    dispatch(productRequested());
    ShopService.getProductItems(searchValue, currentPage, limitPage)
      .then((res) => dispatch(productLoaded(res)))
      .catch((error) => dispatch(productError()));
  }, [currentPage]);

  useEffect(() => {
    ShopService.getTotalCount()
      .then((res) => dispatch(getTotalCount(res)))
      .catch((error) => dispatch(productError()));
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Error />;
  }

  const items = productItems.map((productItem) => {
    return (
      <ProductListItem
        key={productItem.id}
        productItem={productItem}
        onAddToCart={() => dispatch(addedToCart(productItem.id))}
      />
    );
  });

  const View = ({ items }) => {
    return listView ? (
      <Grid container className='product__list'>
        {items}
      </Grid>
    ) : (
      <div className='product__list'>{items}</div>
    );
  };

  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <>
      <View items={items} />
      <Pagination
        count={pagesCount}
        variant='outlined'
        shape='rounded'
        page={currentPage}
        onChange={handleChange}
        className='product__page'
      ></Pagination>
    </>
  );
};

export default ProductList;
