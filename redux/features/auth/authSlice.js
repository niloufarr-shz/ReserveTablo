import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../components/Services/Confgaxios';

// Async Thunk برای اعتبارسنجی توکن
export const validateToken = createAsyncThunk('auth/validateToken', async (token, thunkAPI) => {
  try {
    const response = await api.get('isvalidtoken', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'خطای نامشخص');
  }
});

// Slice برای مدیریت حالت احراز هویت
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // اطلاعات کاربر
    token: null, // توکن دسترسی
    status: 'idle', // وضعیت (idle, loading, succeeded, failed)
    error: null, // خطایی که ممکن است رخ دهد
  },
  reducers: {
    // Reducer برای ذخیره توکن
    setToken: (state, action) => {
      state.token = action.payload; // ذخیره توکن در State
      localStorage.setItem('accessToken', action.payload); // ذخیره توکن در localStorage
    },
    // Reducer برای خروج کاربر
    logout: (state) => {
      state.user = null; // پاک کردن اطلاعات کاربر
      state.token = null; // پاک کردن توکن
      localStorage.removeItem('accessToken'); // حذف توکن از localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // وقتی عملیات اعتبارسنجی شروع می‌شود
      .addCase(validateToken.pending, (state) => {
        state.status = 'loading'; // وضعیت به "در حال بارگذاری" تغییر می‌کند
        state.error = null; // خطای قبلی پاک می‌شود
      })
      // وقتی عملیات موفقیت‌آمیز است
      .addCase(validateToken.fulfilled, (state, action) => {
        state.status = 'succeeded'; // وضعیت به "موفق" تغییر می‌کند
        state.user = action.payload.user; // ذخیره اطلاعات کاربر
      })
      // وقتی عملیات ناموفق است
      .addCase(validateToken.rejected, (state, action) => {
        state.status = 'failed'; // وضعیت به "ناموفق" تغییر می‌کند
        state.error = action.payload; // ذخیره پیام خطای سرور
      });
  },
});

// Export Actions
export const { setToken, logout } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;