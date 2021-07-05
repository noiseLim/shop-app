import { combineReducers } from 'redux';

import productListReducer from '../components/product-list/product-list-slice';
import sortPanelReducer from '../components/sort-panel/sort-panel-slice';
import navPanelReducer from '../components/nav-panel/nav-panel-slice';

export default combineReducers({
  productList: productListReducer,
  sortPanel: sortPanelReducer,
  navPanel: navPanelReducer,
});
