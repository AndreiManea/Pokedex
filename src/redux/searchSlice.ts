import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchTerm: string;
  searchType: string;
  searchLoading: boolean;
  viewAll: boolean;
} = {
  searchTerm: "",
  searchType: "",
  searchLoading: false,
  viewAll: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setGlobalSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setSearchLoading: (state, action) => {
      state.searchLoading = action.payload;
    },
    setViewAll: (state, action) => {
      state.viewAll = action.payload;
    },
  },
});

export const {
  setGlobalSearchTerm,
  setSearchType,
  setSearchLoading,
  setViewAll,
} = searchSlice.actions;

export default searchSlice.reducer;
