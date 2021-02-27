import {createSlice} from '@reduxjs/toolkit';

const  appSlice = createSlice({
    name: 'app',
    initialState: {
        _isAuth: false,
        _user: {}
    },
    reducers: {
        getIsAuth: (state, action) => {
            return {
                ...state,
                _isAuth: state._isAuth
            };
        },
        getUser: (state, action) => {
            return {
                ...state,
                _user: state._user
            }
        }
    }
})

export const {getIsAuth, getUser} = appSlice.actions

export default appSlice.reducer