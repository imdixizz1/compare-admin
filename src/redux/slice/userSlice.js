import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/axiosApi";
import jwt_decode from "jwt-decode";
import { SetDevKey, setToken } from "../../component/util/setAuth";
import { key } from "../../component/util/config";


const initialState = {
  user: [],
  isLoading: false,
  isSkeleton: false,

};
export const userAll = createAsyncThunk("user/userAll", async () => {
  return apiInstance.get("user/userAll");
});


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    // userAll
    builder.addCase(userAll.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(userAll.fulfilled, (state, action) => {
  
      state.user = action.payload.user;
      state.isSkeleton = false;
    });
    builder.addCase(userAll.rejected, (state, action) => {
      state.isSkeleton = false;
    });
  
  },
});
export default userSlice.reducer;

