import {createSlice} from '@reduxjs/toolkit';

const cartTableSlice = createSlice({
    name: 'cartTable',
    initialState: {
        items: [],
        totalPrice: 0
    },
    reducers: {
        addItemToCart: (state, action) => {
            // const id = action.payload;
            // const itemInd = state.items.findIndex(item => item.id === id);
            return {
                ...state,
                items: []
            }
        }
    }
})

export const {addToCart} = cartTableSlice.actions

export default cartTableSlice.reducer