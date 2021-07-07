import React, { useState, useEffect } from 'react';
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
import { createMuiTheme } from '@material-ui/core';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import googleLogo from '../../assets/google.png';
import fire from '../app/fire';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href={SHOP_ROUTE}>
        Shop App
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // const clearInputs = () => {
  //   setEmail('');
  //   setPassword('');
  // };
  // const clearErrors = () => {
  //   setEmailError('');
  //   setPasswordError('');
  // };

  const classes = useStyles();
  const [user] = useAuthState(firebase.auth());

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await fire.auth().signInWithPopup(provider);
    console.log(user);
  };

  const loginWithEmailAndPassword = async () => {
    // clearErrors();
    await fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong.password':
            setPasswordError(err.message);
            break;
        }
        console.log(user);
      });
  };

  // const authListener = () => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       setUser('');
  //     }
  //   });
  // };
  // useEffect(() => {
  //   authListener();
  // }, []);

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ color: 'red' }}>{emailError}</p>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <p style={{ color: 'red' }}>{passwordError}</p>
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
            onClick={loginWithEmailAndPassword}
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
            onClick={loginWithGoogle}
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
