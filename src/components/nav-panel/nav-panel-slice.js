import {createSlice} from '@reduxjs/toolkit';

const navPanelSlice = createSlice({
    name: 'navPanel',
    initialState: {
        category: []
    },
    reducers: {
        getCategory: (state, action) => {

            return {
                ...state,
                category: action.payload,
            };
        },
    }
})

export const {getCategory} = navPanelSlice.actions

export default navPanelSlice.reducer