import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    _isAuth: true,
    _user: {},
  },
  reducers: {
    setIsAuth: (state, action) => {
      return {
        ...state,
        _isAuth: !state._isAuth,
      };
    },
    getUser: (state, action) => {
      return {
        ...state,
        _user: state._user,
      };
    },
  },
});

export const { setIsAuth, getUser } = appSlice.actions;

export default appSlice.reducer;
