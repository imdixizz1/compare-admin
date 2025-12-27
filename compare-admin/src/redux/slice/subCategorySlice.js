import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  subCategory: [],
  isLoading: false,
  isSkeleton: false,
  total: null,
};
export const subCategoryGet = createAsyncThunk(
  'admin/subCategory/get',
  async (payload) => {
    return apiInstance.get(
      `admin/subCategory/get?start=${payload.start}&limit=${payload?.limit}`
    );
  }
);

export const subCategoryAdd = createAsyncThunk(
  'admin/subCategory/create',
  async (payload) => {
    return apiInstance.post(
      `admin/subCategory/create?categoryId=${payload.categoryId}&name=${payload.name}`
    );
  }
);

export const subCategoryUpdate = createAsyncThunk(
  'admin/subCategory/update',
  async (payload) => {
    return apiInstance.patch(
      `admin/subCategory/update?subCategoryId=${payload.id}&name=${payload.name}`
    );
  }
);

export const subCategoryDelete = createAsyncThunk(
  'admin/subCategory/delete',
  async (id) => {
    return apiInstance.delete(`admin/subCategory/delete?subCategoryId=${id}`);
  }
);

export const categoryWise = createAsyncThunk(
  'admin/subCategory/getSubCategoryCategoryWise',
  async (payload) => {
    return apiInstance.get(
      `admin/subCategory/getSubCategoryCategoryWise?categoryId=${payload}`
    );
  }
);

const subCategorySlice = createSlice({
  name: 'subCategorySlce',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // categoryGet
    builder.addCase(subCategoryGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(subCategoryGet.fulfilled, (state, action) => {
      state.subCategory = action.payload.data;
      state.total = action.payload.total;
      state.isSkeleton = false;
    });
    builder.addCase(subCategoryGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(categoryWise.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(categoryWise.fulfilled, (state, action) => {
      state.subCategory = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(categoryWise.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(subCategoryAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(subCategoryAdd.fulfilled, (state, action) => {
      if (action.payload.status) {
        state?.subCategory?.unshift(action?.payload?.data);

        Success('Category Add Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(subCategoryAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(subCategoryUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(subCategoryUpdate.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedCategory = action.payload.data;
        const subCategoryIndex = state.subCategory.findIndex(
          (subCategory) => subCategory?._id === updatedCategory?._id
        );
        if (subCategoryIndex !== -1) {
          state.subCategory[subCategoryIndex] = {
            ...state?.subCategory[subCategoryIndex],
            ...action?.payload?.data,
          };
        }
        Success('Subcategory Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(subCategoryUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(subCategoryDelete.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(subCategoryDelete.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.subCategory = state.subCategory.filter(
          (subCategory) => subCategory._id !== action.meta.arg
        );
        Success('subcategory Delete Successfully');
      }
      state.isLoading = false;
    });
    builder.addCase(subCategoryDelete.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default subCategorySlice.reducer;
