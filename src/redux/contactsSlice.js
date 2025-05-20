import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  editContact,
  fetchDataThunk,
} from './contactsOps';

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',

  initialState: INITIAL_STATE,

  extraReducers: builder => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchDataThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchDataThunk.pending, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.items = state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
