import React from 'react';
import ProductList from '../product-list';
import Grid from '@material-ui/core/Grid';
import SortPanel from '../sort-panel';
import SearchPanel from '../search-panel';

const MainPage = () => {
    return (
        <Grid container>
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