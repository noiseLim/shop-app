import {combineReducers} from 'redux';
import productListReducer from '../components/product-list/productListSlice';

export default combineReducers({
    productList: productListReducer
})