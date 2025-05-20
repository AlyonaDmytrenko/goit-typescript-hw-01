import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectNameFilter = state => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const search = filter.toLowerCase();
    return contacts.filter(
      ({ name = '', number = '' }) =>
        name.toLowerCase().includes(search) ||
        number.toLowerCase().includes(search)
    );
  }
);
