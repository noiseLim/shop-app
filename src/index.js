import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/app';
import rootReducer from './reducers';
import ErrorBoundry from './components/error-boundry';
import ShopService from './services/shop-service';

import './index.scss';
import 'firebase/firestore';
import 'firebase/auth';

const shopService = new ShopService();
export const Context = createContext(null);

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <Context.Provider value={shopService}>
        <Router>
          <App />
        </Router>
      </Context.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
