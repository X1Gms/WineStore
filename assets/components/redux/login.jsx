import { createSlice } from "@reduxjs/toolkit";
import { LoginInputs } from "../../json/components";

export const login = createSlice({
  name: "login",
  initialState: LoginInputs,
  reducers: {
    ChangingInputs: (state, action) => {
      const { index, value } = action.payload;
      state[index].input = value;
    },
  },
});

export const { ChangingInputs } = login.actions;

export default login.reducer;
