import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string | null;
  email: string | null;
  hasSubscription: boolean;
}

interface UserState extends User {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  isAuthenticated: false,
  name: null,
  email: null,
  hasSubscription: false,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<UserState["status"]>) => {
      state.status = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload);
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
    clearUser: (state) => {
      Object.assign(state, { ...initialState, status: "failed" });
    },
  },
});

export const { setUser, clearUser, setAuthStatus } = userSlice.actions;

export default userSlice.reducer;
