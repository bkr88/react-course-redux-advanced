import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },

    showNotification(state, action) {
      state.notification = { ...action.payload };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
