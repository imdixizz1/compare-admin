import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  category: [],
  isLoading: false,
  isSkeleton: false,
};
export const categoryGet = createAsyncThunk(
  'admin/category/getCategory',
  async (payload) => {
    return apiInstance.get(
      `admin/category/getCategory?start=${payload.start}&limit=${payload?.limit}`
    );
  }
);

export const categoryAdd = createAsyncThunk(
  'admin/category/createCategory',
  async (payload) => {
    return apiInstance.post(`admin/category/createCategory`, payload);
  }
);

export const categoryUpdate = createAsyncThunk(
  'admin/category/updateCategory',
  async (payload) => {
    return apiInstance.patch(
      `admin/category/updateCategory?categoryId=${payload?.id}`,
      payload.data
    );
  }
);

export const categoryDelete = createAsyncThunk(
  'admin/category/delete',
  async (id) => {
    return apiInstance.delete(
      `admin/category/delete?categoryId=${id}`
    );
  }
);

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // categoryGet
    builder.addCase(categoryGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(categoryGet.fulfilled, (state, action) => {
      state.category = action.payload.data;
      state.isSkeleton = false;
    });
    builder.addCase(categoryGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(categoryAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(categoryAdd.fulfilled, (state, action) => {
      if (action.payload.status) {
        state?.category?.unshift(action?.payload?.data);

        Success('Category Add Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(categoryAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(categoryUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(categoryUpdate.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedCategory = action.payload.data;
        const categoryIndex = state.category.findIndex(
          (category) => category?._id === updatedCategory?._id
        );
        if (categoryIndex !== -1) {
          state.category[categoryIndex] = {
            ...state?.category[categoryIndex],
            ...action?.payload?.data,
          };
        }
        Success('Category Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(categoryUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(categoryDelete.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(categoryDelete.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.category = state.category.filter(
          (category) => category._id !== action.meta.arg
        );
        Success('Category Delete Successfully');
      }
      state.isLoading = false;
    });
    builder.addCase(categoryDelete.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default categorySlice.reducer;
