import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import firebase from 'firebase';

import App from './components/app';
import rootReducer from './reducers';
import ErrorBoundry from './components/error-boundry';
import ShopService from './services/shop-service';

import './index.scss';
import 'firebase/firestore';
import 'firebase/auth';

const shopService = new ShopService();
export const Context = createContext(null);
export const AuthContext = createContext(null);

const store = configureStore({
  reducer: rootReducer,
});

firebase.initializeApp({
  apiKey: 'AIzaSyC0c47e1qbiMIgCG8Ri2uUVepVUA1C7qoM',
  authDomain: 'authorisation-react.firebaseapp.com',
  projectId: 'authorisation-react',
  storageBucket: 'authorisation-react.appspot.com',
  messagingSenderId: '358802366690',
  appId: '1:358802366690:web:b38e977a84b6bda692bebb',
  measurementId: 'G-K05P80F9YR',
});

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <AuthContext.Provider
        value={{
          firebase,
          auth,
          firestore,
        }}
      >
        <Context.Provider value={shopService}>
          <Router>
            <App />
          </Router>
        </Context.Provider>
      </AuthContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
