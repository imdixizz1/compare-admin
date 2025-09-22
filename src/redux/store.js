import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import dialogSlice from "./slice/dialogSlice";
import userSlice from "./slice/userSlice";
import categorySlice from "./slice/categorySlice";
import articleCategorySlice from "./slice/articleCaegorySlice";
import attributesSlice from "./slice/attributesSlice";
import productSlice from "./slice/productSlice";
import articleSlice from './slice/articleSlice';
import subCategorySlice from './slice/subCategorySlice';
import featureSlice from './slice/featureSlice';
import subFeatureSlice from './slice/subFeatureSlice';
import settingSlice from './slice/settingSlice';



// Enable Redux DevTools Extension

const store = configureStore({
  reducer: {
    auth: authSlice,
    dialogue: dialogSlice,
    user: userSlice,
    category: categorySlice,
    subCategory: subCategorySlice,
    articleCategory: articleCategorySlice,
    article: articleSlice,
    attributes: attributesSlice,
    product: productSlice,
    feature: featureSlice,
    subFeature: subFeatureSlice,
    setting: settingSlice,
  },
});

export default store;
