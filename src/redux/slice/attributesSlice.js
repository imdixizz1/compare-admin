import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/axiosApi";

const initialState = {
  attributes: [],
  isLoading: false,
  isSkeleton: false,
};

export const attributesGet = createAsyncThunk("attributes/show", async () => {
  return apiInstance.get("attributes/show");
});

export const attributesUpdate = createAsyncThunk("attributes/update", async (payload) => {
  return apiInstance.patch(`attributes/update?attributesId=${payload.attributesId}`, payload.addAttributes);
});

const attributesSlice = createSlice({
  name: "attributesSlice",
  initialState,
  reducers: {

  },
  
  extraReducers: (builder) => {
    // attributesGet
    builder.addCase(attributesGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(attributesGet.fulfilled, (state, action) => {
      state.attributes = action.payload.attributes;
      state.isSkeleton = false;

    });
    builder.addCase(attributesGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

  

    // attributesUpdate
    builder.addCase(attributesUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(attributesUpdate.fulfilled, (state, action) => {
      const attributesIdx = state.attributes.findIndex((attributes) => attributes._id === action.payload.attributes._id);
      if (attributesIdx !== -1) {
        state.attributes[attributesIdx] = { ...state.attributes[attributesIdx], ...action.payload.attributes };
      }
      state.isLoading = false;
    });
    builder.addCase(attributesUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });


  },
});
export default attributesSlice.reducer;

