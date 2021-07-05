import React from 'react';
import { Grid } from '@material-ui/core';

import CartTable from '../cart-table';
import './page.scss';

const CartPage = () => {
  return (
    <Grid container className='container__wrapper'>
      <CartTable />
    </Grid>
  );
};

export default CartPage;
