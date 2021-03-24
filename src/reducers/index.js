import {combineReducers} from 'redux';

import productListReducer from '../components/product-list/product-list-slice'; 
import sortPanelReducer from '../components/sort-panel/sort-panel-slice';
import navPanelReducer from '../components/nav-panel/nav-panel-slice';
import appReducer from '../components/app/app-slice';
import cartTableReducer from '../components/cart-table/cart-table-slice';

export default combineReducers({
    productList: productListReducer,
    sortPanel: sortPanelReducer,
    navPanel: navPanelReducer,
    app: appReducer,
    cartTable: cartTableReducer
})