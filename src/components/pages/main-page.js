import React from 'react';
import Grid from '@material-ui/core/Grid';

import ProductList from '../product-list';
import SortPanel from '../sort-panel';
import NavPanel from '../nav-panel';

import './page.scss';

const MainPage = () => {
  return (
    <Grid container className='container__wrapper'>
      <Grid item xs={12}>
        <SortPanel />
      </Grid>
      <Grid item xs={3} className='nav-panel'>
        <NavPanel />
      </Grid>
      <Grid item xs={9} id='product-list'>
        <ProductList />
      </Grid>
    </Grid>
  );
};

export default MainPage;
