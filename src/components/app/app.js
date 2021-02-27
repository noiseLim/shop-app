import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import { authRoutes, publickRoutes } from '../../routes';
import { SHOP_ROUTE } from '../../utils/consts';

const App = () => {
    const isAuth = false
    return (
        <>
            <Switch>
                {isAuth && authRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} component={Component} exact/>
                )}
                {publickRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} component={Component} exact/>
                )}
                <Redirect to={SHOP_ROUTE}/>
            </Switch>
        </>
    )
}

export default App;