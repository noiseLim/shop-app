import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app';
import store from './store';
import ErrorBoundry from './components/error-boundry';
import ShopServiceContext from './components/shop-service-context';
import ShopService from './services/shop-service';

import './index.scss';

const shopService = new ShopService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <ShopServiceContext.Provider value={shopService}>
                <Router>
                    <App/>
                </Router>
            </ShopServiceContext.Provider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);