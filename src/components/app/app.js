import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useAuthState } from 'react-firebase-hooks/auth';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { authRoutes, publickRoutes } from '../../routes';
import { SHOP_ROUTE } from '../../utils/consts';
import AppHeader from '../app-header';
import AppFooter from '../app-footer';
import fire from '../app/fire';
import { Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fab: {
    color: '#ffffff',
    backgroundColor: 'rgb(41, 167, 69)',
    '&:hover': {
      backgroundColor: 'rgb(17, 117, 39)',
    },
    [theme.breakpoints.down(991)]: {
      display: 'none',
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const App = (props) => {
  const [user] = useAuthState(fire.auth());
  const classes = useStyles();

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 50px)' }}>
        <Grid container>
          <AppHeader />
        </Grid>
        <Toolbar id='back-to-top-anchor' />
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
      <ScrollTop {...props}>
        <Fab
          size='medium'
          aria-label='scroll back to top'
          className={classes.fab}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default App;
