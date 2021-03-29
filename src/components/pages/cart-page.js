import { Grid } from '@material-ui/core';
import React from 'react';

import CartTable from '../cart-table';
import './page.scss';

const CartPage = () => {
    return (
        <Grid container className="container__wrapper">
            <Grid item xs={9}>
                <CartTable/>
            </Grid>
            <Grid item xs={3}>
                <CartTable/>
            </Grid>
        </Grid>
    );
};

export default CartPage;