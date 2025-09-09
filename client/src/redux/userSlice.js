// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const registerUser = createAsyncThunk(
//   'user/register',
//   async ({ email, password }) => {
//     const res = await fetch('http://localhost:5000/api/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
//     if (!res.ok) throw new Error('Registration failed');
//     return res.json();
//   }
// );

// export const loginUser = createAsyncThunk(
//   'user/login',
//   async ({ email, password }) => {
//     const res = await fetch('http://localhost:5000/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
//     if (!res.ok) throw new Error('Login failed');
//     return res.json();
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: { user: null, status: 'idle' },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload.email;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//       });
//   },
// });


// export default userSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, password }) => {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle' },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.email;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

// Named export for the logout action
export const { logout } = userSlice.actions;

// Default export for the reducer
export default userSlice.reducer;

