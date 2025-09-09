// src/redux/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch profile info from backend
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId) => {
    const res = await fetch(`http://localhost:5000/profile?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    const data = await res.json();
    return data;
  }
);

// initial state
const initialState = {
  name: "Unknown",
  username: "Unknown",
  rollNo: "Unknown",
  branch: "Unknown",
  semester: "Unknown",
  sgpa: "Unknown",
  cgpa: "Unknown",
  university: "Unknown",
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        return { ...state, ...action.payload, status: "succeeded" };
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
