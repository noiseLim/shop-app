import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { SHOP_ROUTE } from '../../utils/consts';


function Copyright() {
  return (
    <Typography variant="body2">
      {'Copyright © '}
      <Link color="inherit" href={SHOP_ROUTE}>
        Shop App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  typography: {
    color: '#fff',
    maxWidth: 1180
  },
  footer: {
    padding: 15,
    height: 50,
    backgroundColor: '#333333',
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
      <footer className={classes.footer}>
        <Container className={classes.typography}>
          <Copyright />
        </Container>
      </footer>
  );
}