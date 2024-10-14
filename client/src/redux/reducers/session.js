/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  helloWorld: null,
};

const reducers = {
  setHelloWorld: (state, action) => {
    state.hello = action.payload;
  },
};

export const session = createSlice({
  name: "session",
  initialState,
  reducers,
});
