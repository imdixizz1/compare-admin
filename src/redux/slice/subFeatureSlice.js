import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  subFeature: [],
  total: null,
  isLoading: false,
  isSkeleton: false,
};
export const subFeatureGet = createAsyncThunk(
  'admin/subfeature/getSubfeature',
  async (payload) => {
    return apiInstance.get(
      `admin/subfeature/getSubfeature?start=${payload.start}&limit=${payload?.limit}`
    );
  }
);

export const getFeatureWise = createAsyncThunk(
  'admin/subfeature/getFeatureWise',
  async (payload) => {
    return apiInstance.get(
      `admin/subfeature/getFeatureWise?featureId=${payload}`
    );
  }
);

export const subFeatureAdd = createAsyncThunk(
  'admin/subfeature/createSubfeature',
  async (payload) => {
    return apiInstance.post(
      `admin/subfeature/createSubfeature?featureId=${payload.id}`,
      payload?.formData
    );
  }
);

export const subFeatureUpdate = createAsyncThunk(
  'admin/subfeature/updateSubfeature',
  async (payload) => {
    return apiInstance.patch(
      `admin/subfeature/updateSubfeature?subfeatureId=${payload?.id}`,
      payload?.formData
    );
  }
);

export const subFeatureDelete = createAsyncThunk(
  'admin/subfeature/deleteSubfeature',
  async (id) => {
    return apiInstance.delete(
      `admin/subfeature/deleteSubfeature?subfeatureId=${id}`
    );
  }
);

export const handleSwitch = createAsyncThunk(
  'admin/subfeature/handleSubfeature',
  async (payload) => {
    return apiInstance.patch(
      `admin/subfeature/handleSubfeature?subfeatureId=${payload?.id}&type=${payload?.type}`
    );
  }
);

const subFeatureSlice = createSlice({
  name: 'subFeatureSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // categoryGet
    builder.addCase(subFeatureGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(subFeatureGet.fulfilled, (state, action) => {
      state.subFeature = action.payload.data;
      state.total = action.payload.total;
      state.isSkeleton = false;
    });
    builder.addCase(subFeatureGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(getFeatureWise.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(getFeatureWise.fulfilled, (state, action) => {
      state.subFeature = action.payload.data;
      state.total = action.payload.total;
      state.isSkeleton = false;
    });
    builder.addCase(getFeatureWise.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(subFeatureAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(subFeatureAdd.fulfilled, (state, action) => {
      if (action.payload.status) {
        state?.subFeature?.unshift(action?.payload?.data);

        Success('subFeature Add Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(subFeatureAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(subFeatureUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(subFeatureUpdate.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedSubFeature = action.payload.data;
        const subFeatureIndex = state.subFeature.findIndex(
          (subFeature) => subFeature?._id === updatedSubFeature?._id
        );
        if (subFeatureIndex !== -1) {
          state.subFeature[subFeatureIndex] = {
            ...state?.subFeature[subFeatureIndex],
            ...action?.payload?.data,
          };
        }
        Success('subFeature Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(subFeatureUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(subFeatureDelete.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(subFeatureDelete.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.subFeature = state.subFeature.filter(
          (subFeature) => subFeature._id !== action.meta.arg
        );
        Success('subFeature Delete Successfully');
      }
      state.isLoading = false;
    });
    builder.addCase(subFeatureDelete.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(handleSwitch.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(handleSwitch.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedSubFeature = action.payload.data;
        const subFeatureIndex = state.subFeature.findIndex(
          (subFeature) => subFeature?._id === updatedSubFeature?._id
        );
        if (subFeatureIndex !== -1) {
          state.subFeature[subFeatureIndex] = {
            ...state?.subFeature[subFeatureIndex],
            ...action?.payload?.data,
          };
        }
        Success('subFeature Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(handleSwitch.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default subFeatureSlice.reducer;
