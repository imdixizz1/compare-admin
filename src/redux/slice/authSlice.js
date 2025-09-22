/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance, apiInstanceFetch } from '../../api/axiosApi';
import { jwtDecode } from 'jwt-decode';
import { SetDevKey, setToken } from '../../component/util/setAuth';
import { key } from '../../component/util/config';
import { DangerRight, Success } from '../../api/toastServices';
import axios from 'axios';

const initialState = {
  admin: {},
  isAuth: false,
  isLoading: false,
};

export const login = createAsyncThunk('admin/admin/login', async (payload) => {
  return apiInstance.post(
    `admin/admin/login?email=${payload.email}&password=${payload.password}`
  );
});

export const getAdmin = createAsyncThunk('admin/admin/getProfile', async () => {
  return apiInstanceFetch.get('admin/admin/getProfile?email=compare@admin.com');
});

export const updateAdmin = createAsyncThunk('admin/update', async (payload) => {
  return apiInstance.patch('admin/update', payload);
});

export const updateAdminPassword = createAsyncThunk(
  'admin/updateAdminPassword',
  async (payload) => {
    return apiInstance.put('admin/updateAdminPassword', payload);
  }
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setOldAdmin(state, action) {
      let token = action.payload;
      state.admin = token;
      state.isAuth = true;
      SetDevKey(key);
      setToken(token);
    },
    logout(state, action) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin_');
      localStorage.removeItem('key');
      localStorage.removeItem('isAuth');
      state.admin = {};
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      // state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload && action.payload.status !== false) {
        let token_ = jwtDecode(action.payload.data);
        state.flag = action.payload.flag;
        state.admin = token_;
        state.isAuth = true;

        SetDevKey(key);
        setToken(action.payload.data);
        console.log('action.payload.token', action.payload.data);
        localStorage.setItem('token', action.payload.data);
        localStorage.setItem('key', key ? key : undefined);
        localStorage.setItem('isAuth', true);
        Success('Login successfully');
      } else {
        DangerRight(action?.payload?.message);
        // state.isLoading = false;
      }
      // state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      // state.isLoading = false;
    });

    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.admin = action.payload.data;
    });

    builder.addCase(getAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateAdmin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.admin = {
        ...state.admin,
        name: action.payload?.admin?.name,
        email: action.payload?.admin?.email,
        image: action.payload?.admin?.image,
      };
      state.isLoading = false;
      Success('Admin Updated Successfully');
    });

    builder.addCase(updateAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateAdminPassword.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateAdminPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.admin = action?.payload?.admin;
      localStorage.removeItem('token');
      localStorage.removeItem('key');
      localStorage.removeItem('isAuth');
      setToken();
      SetDevKey();
      state.admin = {};
      state.isAuth = false;

      window.location.href = '/login';
      Success('Admin Updated Successfully');
    });

    builder.addCase(updateAdminPassword.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default authSlice.reducer;
export const { setOldAdmin, logout } = authSlice.actions;
