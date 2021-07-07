import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useAuthState } from 'react-firebase-hooks/auth';

import { authRoutes, publickRoutes } from '../../routes';
import { SHOP_ROUTE } from '../../utils/consts';
import AppHeader from '../app-header';
import AppFooter from '../app-footer';
import fire from '../app/fire';

const App = () => {
  const [user] = useAuthState(fire.auth());

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 50px)' }}>
        <Grid container>
          <AppHeader />
        </Grid>
        <Switch>
          {user &&
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
