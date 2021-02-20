import {createSlice} from '@reduxjs/toolkit';

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        currentPage: 1,
        limitPage: 15,
        totalCount: [],
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
        },
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: action.payload,
                error: false
            };
        },
        getTotalCount: (state, action) => {
            return {
                ...state,
                totalCount: action.payload,
                loading: false
            };
        }
    }
})

export const {productLoaded, productRequested, productError, setCurrentPage, getTotalCount} = productListSlice.actions

export default productListSlice.reducer