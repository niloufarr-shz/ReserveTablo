import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../components/Services/Confgaxios"
// async thunk برای اعتبارسنجی توکن
export const validateToken = createAsyncThunk('auth/validateToken', async (token, thunkAPI) => {
  const response = await api.get('isvalidtoken', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
