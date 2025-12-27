import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  feature: [],
  total: null,
  isLoading: false,
  isSkeleton: false,
};
export const featureGet = createAsyncThunk(
  'admin/feature/getFeature',
  async (payload) => {
    return apiInstance.get(
      `admin/feature/getFeature?start=${payload.start}&limit=${payload?.limit}`
    );
  }
);

export const featureSubCategoryWiseGet = createAsyncThunk(
  'admin/feature/getSubcategoryIdWise',
  async (payload) => {
    return apiInstance.get(
      `admin/feature/getSubcategoryIdWise?subcategoryId=${payload}`
    );
  }
);

export const featureAdd = createAsyncThunk(
  'admin/feature/createFeature',
  async (payload) => {
    return apiInstance.post(
      `admin/feature/createFeature?subcategoryId=${payload.id}`,
      payload.formData,
      payload
    );
  }
);

export const featureUpdate = createAsyncThunk(
  'admin/feature/updateFeature',
  async (payload) => {
    return apiInstance.patch(
      `admin/feature/updateFeature?featureId=${payload?.id}`,
      payload.formData,
      payload.data
    );
  }
);

export const featureDelete = createAsyncThunk(
  'admin/feature/deleteFeature',
  async (id) => {
    return apiInstance.delete(`admin/feature/deleteFeature?featureId=${id}`);
  }
);


export const handleSwitch = createAsyncThunk(
  'admin/feature/handleActiveOrNotfeature',
  async (id) => {
    return apiInstance.patch(`admin/feature/handleActiveOrNotfeature?featureId=${id}`);
  }
);

const featureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // categoryGet
    builder.addCase(featureGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(featureGet.fulfilled, (state, action) => {
      state.feature = action.payload.data;
      state.total = action.payload.total;
      state.isSkeleton = false;
    });
    builder.addCase(featureGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });


    builder.addCase(featureSubCategoryWiseGet.fulfilled, (state, action) => {
      state.feature = action.payload.data;
    });

    builder.addCase(featureSubCategoryWiseGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });
    

    builder.addCase(featureAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(featureAdd.fulfilled, (state, action) => {
      
      if (action.payload.status) {
        
        state.feature.unshift(action?.payload?.data);

        Success('feature Add Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(featureAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(featureUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(featureUpdate.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedFeature = action.payload.data;
        const featureIndex = state.feature.findIndex(
          (feature) => feature?._id === updatedFeature?._id
        );
        if (featureIndex !== -1) {
          state.feature[featureIndex] = {
            ...state?.feature[featureIndex],
            ...action?.payload?.data,
          };
        }
        Success('feature Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(featureUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(featureDelete.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(featureDelete.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.feature = state.feature.filter(
          (feature) => feature._id !== action.meta.arg
        );
        Success('feature Delete Successfully');
      }
      state.isLoading = false;
    });
    builder.addCase(featureDelete.rejected, (state, action) => {
      state.isLoading = false;
    });



     builder.addCase(handleSwitch.pending, (state, action) => {
          state.isLoading = true;
        });
    
        builder.addCase(handleSwitch.fulfilled, (state, action) => {
          if (action.payload.status) {
            const updatedFeature = action.payload.data;
            const featureIndex = state.feature.findIndex(
              (feature) => feature?._id === updatedFeature?._id
            );
            if (featureIndex !== -1) {
              state.feature[featureIndex] = {
                ...state?.feature[featureIndex],
                ...action?.payload?.data,
              };
            }
            Success('feature Update Successfully');
          }
          state.isLoading = false;
        });
    
        builder.addCase(handleSwitch.rejected, (state, action) => {
          state.isLoading = false;
        });
  },
});
export default featureSlice.reducer;
