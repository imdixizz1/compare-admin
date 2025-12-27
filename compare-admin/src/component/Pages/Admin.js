/* eslint-disable eqeqeq */
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import $ from 'jquery';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import { AdminProfile } from './AdminProfile';
import ArticleCategory from '../tables/articleCategory/ArticleCategory';
import Article from '../tables/article/Article';
import ArticleInfo from '../tables/article/ArticleInfo';
import ArticleDialog from '../tables/article/ArticleDialog';
import Category from '../tables/category/Category';
import SubCategory from '../tables/subCategory/SubCategory';
import Feature from '../tables/features/Feature';
import SubFeature from '../tables/subFeature/SubFeature';
import Product from '../tables/product/Product';
import ProductDialog from '../tables/product/ProductDialog';
import ArticleDialogDirect from '../tables/article/ArticleDialogDirect';
import Setting from '../tables/setting/Setting';
import PartnershipSetting from '../tables/setting/PartnershipSetting';
import EditGuilde from '../tables/setting/EditGuide';
import PrivacyPolicy from '../tables/setting/PrivcyPolicy';
import TermsSetting from '../tables/setting/TermsSetting';

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname == '/' ||
      location.pathname == '/admin' ||
      location.pathname == '/admin/' ||
      location.pathname == ''
    ) {
      // window.location.reload(true);
      navigate('/admin/adminDashboard');
    }
  }, []);
  var webSize = $(window).width();

  return (
    <div className={`mainAdminGrid  ${webSize < 991 && 'webAdminGrid'}`}>
      <Sidebar />

      <div className={`mainAdmin`}>
        <Navbar />
        <div className="adminStart">
          <Routes>
            <Route path="/adminDashboard" element={<Dashboard />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/articleCategory" element={<ArticleCategory />} />
            <Route path="/article" element={<Article />} />
            <Route path="/category" element={<Category />} />
            <Route path="/article/info" element={<ArticleInfo />} />
            <Route path="/article/create" element={<ArticleDialog />} />
            <Route path="/article/createDirect" element={<ArticleDialogDirect />} />
            <Route path="/product/create" element={<ProductDialog />} />
            <Route path="/subcategory" element={<SubCategory />} />
            <Route path="/feature" element={<Feature />} />
            <Route path="/product" element={<Product />} />
            <Route path="/subfeature" element={<SubFeature />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/setting/partnership" element={<PartnershipSetting />} />
            <Route path="/setting/editorialguide" element={<EditGuilde />} />
            <Route path="/setting/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/setting/t&c" element={<TermsSetting />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
