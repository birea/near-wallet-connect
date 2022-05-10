import { createSlice } from "@reduxjs/toolkit";

export interface CompState {
  readonly loading: boolean;
}

const initialState: CompState = {
  loading: false,
};

const compSlice = createSlice({
  name: "comp",
  initialState,
  reducers: {
    changeStatus(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { changeStatus } = compSlice.actions;
export default compSlice.reducer;
