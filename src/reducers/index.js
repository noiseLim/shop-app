import {combineReducers} from 'redux';

import productListReducer from '../components/product-list/product-list-slice'; 
import sortPanelReducer from '../components/sort-panel/sort-panel-slice';
import searchPanelReducer from '../components/search-panel/search-panel-slice';
import appReducer from '../components/app/app-slice';

export default combineReducers({
    productList: productListReducer,
    sortPanel: sortPanelReducer,
    searchPanel: searchPanelReducer,
    app: appReducer
})