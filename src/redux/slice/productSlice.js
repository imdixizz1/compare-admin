import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../../api/axiosApi';
import { Success } from '../../api/toastServices';

const initialState = {
  product: [],
  total: 0,
  productDetails: [],
  isLoading: false,
  isSkeleton: false,
};
export const productGet = createAsyncThunk(
  'admin/product/getProducts',
  async (payload) => {
    return apiInstance.get(
      `admin/product/getProducts?start=${payload.start}&limit=${payload.limit}&isVisible=${payload.isVisible}`
    );
  }
);

export const productGetById = createAsyncThunk(
  'admin/product/getProductById',
  async (payload) => {
    return apiInstance.get(`admin/product/getProductById?productId=${payload}`);
  }
);

export const productAdd = createAsyncThunk(
  'admin/product/addProduct',
  async (payload) => {
    return apiInstance.post('admin/product/addProduct', payload);
  }
);

export const editProductDetail = createAsyncThunk(
  'admin/product/updateProduct',
  async (payload) => {
    return apiInstance.patch(
      `admin/product/updateProduct?productId=${payload.id}`,
      payload.data
    );
  }
);
export const editProductColor = createAsyncThunk(
  'product/updateColor',
  async (payload) => {
    return apiInstance.patch(
      `product/updateColor?productId=${payload.productId}`,
      payload.formData
    );
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteDetails',
  async (id) => {
    return apiInstance.delete(`product/deleteDetails?productCode=${id}`);
  }
);
export const deleteProductColor = createAsyncThunk(
  'product/deleteColor',
  async (id) => {
    return apiInstance.delete(`product/deleteColor?productId=${id}`);
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (payload) => {
    return apiInstance.put(
      `product/updateProduct?productId=${payload.productId}&type=${payload.type}&stock=${payload?.stock}`
    );
  }
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // productGet
    builder.addCase(productGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(productGet.fulfilled, (state, action) => {
      state.product = action.payload.data;
      state.total = action.payload.total;
      state.isSkeleton = false;
    });
    builder.addCase(productGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    // productGet
    builder.addCase(productGetById.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(productGetById.fulfilled, (state, action) => {
      state.productDetails = action.payload.data;
      state.isSkeleton = false;
    });
    builder.addCase(productGetById.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    // ==========================
    // productCreate
    builder.addCase(productAdd.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(productAdd.fulfilled, (state, action) => {
      if(action.payload.status){

        Success("Product added succesfully")
      }
      state.isLoading = false;
    });
    builder.addCase(productAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ==========================
    // editProductDetail
    builder.addCase(editProductDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editProductDetail.fulfilled, (state, action) => {
      if (action.payload.status) {
        const productIdx = state.product.findIndex(
          (product) => product?._id === action?.payload?.data?._id
        );
        if (productIdx !== -1) {
          state.product[productIdx] = {
            ...state.product[productIdx],
            ...action?.payload?.data,
          };
        }
        Success("Product updated succesfully")
      }
      state.isLoading = false;
    });
    builder.addCase(editProductDetail.rejected, (state, action) => {
      state.isLoading = false;
    });

    // editProductColor
    builder.addCase(editProductColor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editProductColor.fulfilled, (state, action) => {
      if (action.payload.status) {
        const productIdx = state.productDetails.findIndex(
          (product) => product._id === action.payload.product._id
        );
        if (productIdx !== -1) {
          state.productDetails[productIdx] = {
            ...state.productDetails[productIdx],
            ...action.payload.product,
          };
        }
      }
      state.isLoading = false;
    });
    builder.addCase(editProductColor.rejected, (state, action) => {
      state.isLoading = false;
    });

    // deleteProduct
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.product = state.product.filter(
        (product) => product._id !== action.meta.arg
      );
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
    });

    // deleteProductColorColor
    builder.addCase(deleteProductColor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductColor.fulfilled, (state, action) => {
      state.productDetails = state.productDetails.filter(
        (product) => product._id !== action.meta.arg
      );
      state.isLoading = false;
    });
    builder.addCase(deleteProductColor.rejected, (state, action) => {
      state.isLoading = false;
    });

    // updateValue
    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const productIdx = state.productDetails.findIndex(
        (product) => product._id === action.payload.product._id
      );
      if (productIdx !== -1) {
        state.productDetails[productIdx] = {
          ...state.productDetails[productIdx],
          ...action.payload.product,
        };
      }
      state.isLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default productSlice.reducer;
