import { createSlice } from '@reduxjs/toolkit';

const sortPanelSlice = createSlice({
  name: 'sortSlice',
  initialState: {
    listView: false,
  },
  reducers: {
    setListView: (state) => {
      return {
        ...state,
        listView: !state.listView,
      };
    },
  },
});

export const { setListView } = sortPanelSlice.actions;

export default sortPanelSlice.reducer;
