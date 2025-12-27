import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance, apiInstanceFetch } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  setting: [],
  isLoading: false,
  isSkeleton: false,
};

export const getSetting = createAsyncThunk(
  'admin/setting/getSetting',
  async (payload) => {
    return apiInstanceFetch.get('admin/setting/getSetting');
  }
);

export const updateSetting = createAsyncThunk(
  'admin/setting/updateSetting',
  async (payload) => {
    return apiInstanceFetch.patch(
      `admin/setting/updateSetting?settingId=${payload.id}`,
      payload.settingData
    );
  }
);

const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSetting.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSetting.fulfilled, (state, action) => {
      state.setting = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getSetting.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateSetting.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateSetting.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.setting = action.payload.data;
        Success('Data updated successfully');
      }
      state.isLoading = false;
    });
    builder.addCase(updateSetting.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default settingSlice.reducer;
