import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  article: [],
  isLoading: false,
  isSkeleton: false,
  total: null,
};
export const articleGet = createAsyncThunk(
  'admin/article/get',
  async (payload) => {
    return apiInstance.get(
      `admin/article/get?start=${payload.start}&limit=${payload?.limit}`
    );
  }
);

export const articleAdd = createAsyncThunk(
  'admin/article/create',
  async (payload) => {
    return apiInstance.post(`admin/article/create`, payload);
  }
);

export const articleUpdate = createAsyncThunk(
  'admin/article/update',
  async (payload) => {
    return apiInstance.patch(
      `admin/article/update?articleId=${payload?.id}`,
      payload.data
    );
  }
);

export const articleDelete = createAsyncThunk(
  'admin/article/delete',
  async (id) => {
    return apiInstance.delete(`admin/article/delete?articleId=${id}`);
  }
);

export const blockOrNot = createAsyncThunk(
  'admin/article/isBlockOrNot',
  async (id) => {
    return apiInstance.patch(`admin/article/isBlockOrNot?articleId=${id}`);
  }
);

export const trendingArticleCategory = createAsyncThunk(
  'admin/article/isTrendingOrNot',
  async (id) => {
    return apiInstance.patch(`admin/article/isTrendingOrNot?articleId=${id}`);
  }
);

const articleSlice = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // articleGet
    builder.addCase(articleGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(articleGet.fulfilled, (state, action) => {
      state.article = action?.payload?.data;
      state.total = action?.payload?.total;
      state.isSkeleton = false;
    });
    builder.addCase(articleGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(articleAdd.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(articleAdd.fulfilled, (state, action) => {
      if (action?.payload?.status) {
        state.article?.unshift(action?.payload?.data);

        Success('Article Add Successfully');
        debugger
        window.location.href = '/admin/article';
      }
      state.isLoading = false;
    });

    builder.addCase(articleAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(articleUpdate.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(articleUpdate.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedArticle = action.payload.data;
        const articleIndex = state.article.findIndex(
          (article) => article?._id === updatedArticle?._id
        );
        if (articleIndex !== -1) {
          state.article[articleIndex] = {
            ...state.article[articleIndex],
            ...action.payload?.data,
          };
        }
        // window.location.href = '/admin/article';
        Success('Blog Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(articleUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(trendingArticleCategory.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(trendingArticleCategory.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedArticle = action.payload.data;
        const articleIndex = state.article.findIndex(
          (article) => article?._id === updatedArticle?._id
        );
        if (articleIndex !== -1) {
          state.article[articleIndex] = {
            ...state.article[articleIndex],
            ...action.payload?.data,
          };
        }
        // window.location.href = '/admin/article';
        Success('Blog Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(trendingArticleCategory.rejected, (state, action) => {
      state.isLoading = false;
    });

    
    builder.addCase(blockOrNot.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(blockOrNot.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedArticle = action.payload.data;
        const articleIndex = state.article.findIndex(
          (article) => article?._id === updatedArticle?._id
        );
        if (articleIndex !== -1) {
          state.article[articleIndex] = {
            ...state.article[articleIndex],
            ...action.payload?.data,
          };
        }
        // window.location.href = '/admin/article';
        Success('Blog Update Successfully');
      }
      state.isLoading = false;
    });

    builder.addCase(blockOrNot.rejected, (state, action) => {
      state.isLoading = false;
    });


    builder.addCase(articleDelete.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(articleDelete.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.article = state.article.filter(
          (article) => article._id !== action.meta.arg
        );
        Success('Article Delete Successfully');
      }
      state.isLoading = false;
    });
    builder.addCase(articleDelete.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default articleSlice.reducer;
