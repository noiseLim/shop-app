import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  withStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme, IconButton } from '@material-ui/core';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { AuthContext } from '../..';
import googleLogo from '../../assets/google.png';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href={SHOP_ROUTE}>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(41, 167, 69)',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(41, 167, 69)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'rgb(41, 167, 69)',
    '&:hover': {
      backgroundColor: 'rgb(17, 117, 39)',
    },
  },
  link: {
    color: 'rgb(17, 117, 39)',
  },
  googleButton: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgb(229, 222, 222)',
    },
    color: 'rgb(17, 117, 39)',
    border: '1px solid rgb(229, 222, 222)',
  },
  googleLogo: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
}));

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: 'rgb(41, 167, 69)',
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const AuthPage = () => {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(user);
  };
  const [user] = useAuthState(auth);

  return user ? (
    <Redirect to={SHOP_ROUTE} />
  ) : (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <ThemeProvider theme={theme}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </ThemeProvider>
          <FormControlLabel
            control={<GreenCheckbox value='remember' />}
            label='Remember me'
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={login}
          >
            Sign In
          </Button>
          <Typography variant='body1' align='center'>
            or
          </Typography>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.googleButton}
            onClick={login}
          >
            <img
              src={googleLogo}
              alt='google-logo'
              className={classes.googleLogo}
            />
            Continue with Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2' className={classes.link}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={REGISTRATION_ROUTE}
                variant='body2'
                className={classes.link}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AuthPage;
