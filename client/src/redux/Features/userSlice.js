import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.value = action.payload 
    },
    clearUser: (state) => {
      state.value = {}
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;