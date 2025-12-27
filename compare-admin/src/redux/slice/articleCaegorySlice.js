import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  articleCategory: [],
  isLoading: false,
  isSkeleton: false,
  total: null,
};
export const categoryGet = createAsyncThunk(
  'admin/articleCategory/get',
  async (payload) => {
    return apiInstance.get(
      `admin/articleCategory/get?start=${payload.start}&limit=${payload?.limit}`
    );
  }
);

export const categoryAdd = createAsyncThunk(
  'admin/articleCategory/create',
  async (payload) => {
    return apiInstance.post(`admin/articleCategory/create`, payload);
  }
);

export const categoryUpdate = createAsyncThunk(
  'admin/articleCategory/update',
  async (payload) => {
    return apiInstance.patch(
      `admin/articleCategory/update?articleCategoryId=${payload?.id}`,
      payload.data
    );
  }
);

export const trendingArticleCategory = createAsyncThunk(
  'admin/articleCategory/isTrendingOrNot',
  async (id) => {
    return apiInstance.patch(
      `admin/articleCategory/isTrendingOrNot?articleCategoryId=${id}`
    );
  }
);

export const categoryDelete = createAsyncThunk(
  'admin/articleCategory/delete',
  async (id) => {
    return apiInstance.delete(
      `admin/articleCategory/delete?articleCategoryId=${id}`
    );
  }
);

const articleCategorySlice = createSlice({
  name: 'articleCategorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // categoryGet
    builder.addCase(categoryGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(categoryGet.fulfilled, (state, action) => {
      state.articleCategory = action.payload.data;
      state.total = action.payload.total;
      state.isSkeleton = false;
    });
    builder.addCase(categoryGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(trendingArticleCategory.pending, (state, action) => {
      // state.isLoading = true;
    });

    builder.addCase(trendingArticleCategory.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedCategory = action.payload.data;
        const categoryIndex = state.articleCategory.findIndex(
          (articleCategory) => articleCategory?._id === updatedCategory?._id
        );
        if (categoryIndex !== -1) {
          state.articleCategory[categoryIndex] = {
            ...state.articleCategory[categoryIndex],
            ...action.payload?.data,
          };
        }
        Success('Blog Category Update Successfully');
      }
      // state.isLoading = false;
    });

    builder.addCase(trendingArticleCategory.rejected, (state, action) => {
      // state.isLoading = false;
    });

    builder.addCase(categoryAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(categoryAdd.fulfilled, (state, action) => {
      if (action.payload.status) {
        state?.articleCategory?.unshift(action?.payload?.data);

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
        const categoryIndex = state.articleCategory.findIndex(
          (articleCategory) => articleCategory?._id === updatedCategory?._id
        );
        if (categoryIndex !== -1) {
          state.articleCategory[categoryIndex] = {
            ...state.articleCategory[categoryIndex],
            ...action.payload?.data,
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
        state.articleCategory = state.articleCategory.filter(
          (articleCategory) => articleCategory._id !== action.meta.arg
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
export default articleCategorySlice.reducer;
