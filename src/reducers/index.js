import {combineReducers} from 'redux';

import productListReducer from '../components/product-list/product-list-slice'; 
import sortPanelReducer from '../components/sort-panel/sort-panel-slice';

export default combineReducers({
    productList: productListReducer,
    sortPanel: sortPanelReducer
})