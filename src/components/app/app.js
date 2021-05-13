import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { authRoutes, publickRoutes } from '../../routes';
import { SHOP_ROUTE } from '../../utils/consts';
import AppHeader from '../app-header';
import AppFooter from '../app-footer';

const App = () => {
  const isAuth = useSelector((state) => state.app._isAuth);
  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 50px)' }}>
        <Grid container>
          <AppHeader />
        </Grid>
        <Switch>
          {isAuth &&
            authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} component={Component} exact />
            ))}
          {publickRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} exact />
          ))}
          <Redirect to={SHOP_ROUTE} />
        </Switch>
      </div>
      <AppFooter />
    </>
  );
};

export default App;
