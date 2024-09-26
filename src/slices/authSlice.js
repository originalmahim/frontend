import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  user: null, // Add user property to hold user details
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) { // Add this reducer to set user data
      state.user = action.payload; // Action payload will be the user object
    },
    logout(state) {
      state.token = null;
      state.user = null; // Clear user on logout
    },
  },
});

// Export actions for use in components
export const { setSignupData, setLoading, setToken, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
