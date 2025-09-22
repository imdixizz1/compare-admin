import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './component/Pages/Admin';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setToken } from './component/util/setAuth';
import "./assets/scss/custom/custom.css"
import "./assets/scss/default/default.css"
import "./assets/scss/style/style.css"
import AuthRoute from './component/util/AuthRoute';
import { setOldAdmin } from './redux/slice/authSlice';
import Login from './component/Pages/Login';

function App() {

  const dispatch = useDispatch();
  const key = sessionStorage.getItem("key");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token && !key) return;
    dispatch(setOldAdmin(token))
  }, [setToken, key]);
  useEffect(() => {
    // var script = document.createElement("script")
    // script.scr = "//cdn.jsdelivr.net/npm/eruda";
    // document.body.appendChild(script)
    // script.onload = (() => eruda.init())
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>
      </Routes>
      

    </div>
  );
}

export default App;
