import React from 'react';
import Grid from '@material-ui/core/Grid';
import DevicePage from '../device-page';
import './page.scss';

const ItemPage = () => {
    return (
        <Grid container className="container__wrapper">
            <Grid item xs={12}>
                <DevicePage/>
            </Grid>
        </Grid>
    );
};

export default ItemPage;