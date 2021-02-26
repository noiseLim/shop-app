import {createSlice} from '@reduxjs/toolkit';

const searchPanelSlice = createSlice({
    name: 'searchPanel',
    initialState: {
        categoryId: []
    },
    reducers: {
        getCategoryId: (state, action) => {

            return {
                ...state,
                categoryId: action.payload,
            };
        },
    }
})

export const {getCategoryId} = searchPanelSlice.actions

export default searchPanelSlice.reducer