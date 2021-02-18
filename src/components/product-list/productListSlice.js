import {createSlice} from '@reduxjs/toolkit';
import * as R from 'ramda';

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        ids: [],
        loading: true,
        error: false
        
    },
    reducers: {
        productLoaded: (state, action) => {
            // const newValues = R.indexBy(R.prop('id'), action.payload)
            return {
                ...state,
                // products: R.indexBy(R.prop('id'), action.payload),
                ids: R.pluck('id', action.payload),
                products: action.payload,
                loading: false
            };
        },
        productRequested: (state) => {
            return {
                ...state,
                products: state.products,
                loading: true
            };
        },
        productError: (state) => {
            return {
                ...state,
                products: state.products,
                error: true
            };
        }
    }
})


export const {productLoaded, productRequested, productError} = productListSlice.actions

export default productListSlice.reducer