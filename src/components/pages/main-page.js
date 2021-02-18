import React from 'react';
import ProductList from '../product-list';
import Grid from '@material-ui/core/Grid';

const MainPage = () => {
    return (
        <Grid container sacing={3}>
            <Grid item xs={3}>
                Hello
            </Grid>
            <Grid item xs={9}>
                <ProductList/>
            </Grid>
        </Grid>
    )
}

export default MainPage;