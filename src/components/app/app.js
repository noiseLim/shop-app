import React from 'react';
import {Switch, Route} from 'react-router-dom';

import MainPage from '../pages/main-page';

const App = () => {
    return (
        <>
            <Switch>
                <Route path='/' exact component={MainPage}/>
            </Switch>
        </>
    )
}

export default App;
