import React from 'react';
import Grid from '@material-ui/core/Grid';

import ProductList from '../product-list';
import SortPanel from '../sort-panel';
import SearchPanel from '../search-panel';

import './main-pages.scss';

const MainPage = () => {
    return (
        <Grid container className="container__wrapper">
            <Grid item xs={12}>
                <SortPanel/>
            </Grid>
            <Grid item xs={3}>
                <SearchPanel/>
            </Grid>
            <Grid item xs={9}>
                <ProductList/>
            </Grid>
        </Grid>
    )
}

export default MainPage;