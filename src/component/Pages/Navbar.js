import { useSelector } from 'react-redux';
import AdminProfile from "../../assets/images/admin.jpg";

const Navbar = () => {
  const { admin } = useSelector((state) => state.auth);
  return (
    <>
      <div className="mainNavbar">
        <div className="navBar">
          <div className="innerNavbar betBox">
            <div className="leftNav">
              <i className="ri-bar-chart-horizontal-line cursor-pointer fs-20 navToggle"></i>
            </div>
            <div className="rightNav">
              <div className="adminProfile betBox">
                <div className="adminPic m8-right">
                  <img src={AdminProfile} alt="admin" />
                </div>
                <div className="adminDetails">
                  <h6 className="m0">{admin.name}</h6>
                  <p className="m0">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;
