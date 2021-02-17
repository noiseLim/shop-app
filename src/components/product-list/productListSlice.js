import {createSlice} from '@reduxjs/toolkit';

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        loading: true,
        error: false
        
    },
    reducers: {
        productLoaded: (state, action) => {
            return {
                ...state,
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