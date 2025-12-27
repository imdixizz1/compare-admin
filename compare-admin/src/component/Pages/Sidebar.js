import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import LogoSm from '../../assets/images/logoSm.png';
// import "../../assets/js/custom";
// import { warning } from "../util/Alert";
import { useDispatch } from 'react-redux';
import Navigator from '../extra/Navigator';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { logout } from '../../redux/slice/authSlice';
import { warning } from '../util/Alert';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const data = warning();
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        console.log('yes', yes);
        if (yes) {
          dispatch(logout());
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  const navBarArray = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      navIcon: 'ri-dashboard-2-line',
    },
    {
      name: 'Blog category',
      navIcon: 'fa-solid fa-newspaper',
      path:'/admin/articleCategory'
    },
    {
      name: 'Blog',
      navIcon: 'fa-brands fa-blogger',
      path:'/admin/article'
    },
    {
      name: 'Product Category',
      navIcon: 'fa-solid fa-list',
      path:"/admin/category"
    },  
    {
      name: 'Product subcategory',
      navIcon: 'fa-solid fa-layer-group',
      path:"/admin/subcategory"
    }, 
    {
      name: ' Features',
      navIcon: 'fa-solid fa-cubes',
      path:"/admin/feature"
    },  
    {
      name: 'Subfeatures',
      navIcon: 'fa-solid fa-cubes-stacked',
      path:"/admin/subfeature"
    }, 
    {
      name: 'Product',
      path: '/admin/product',
      navIcon: 'fa-brands fa-product-hunt',
    },

    {
      name: 'Profile',
      path: '/admin/profile',
      navIcon: 'ri-profile-line',
    },
    // {
    //   name: 'Setting',
    //   path: '/admin/setting',
    //   navIcon: 'ri-settings-2-line',
    // },
    {
      name: 'Setting',
      navIcon: 'ri-settings-2-line',
      subMenu: [
        {
          subName: 'Partnership',
          subPath: '/admin/setting/partnership',
        },
        {
          subName: 'Editorial Guidelnes',
          subPath: '/admin/setting/editorialguide',
        },
        {
          subName: 'Privacy policy',
          subPath: '/admin/setting/privacypolicy',
        },
        {
          subName: 'Terms and conditions',
          subPath: '/admin/setting/t&c',
        },
      ],
    },

    {
      name: 'LogOut',
      navIcon: 'ri-logout-circle-r-line',
      onClick: handleLogout,
    },
  ];

  var webSize = $(window).width();
  return (
    <div className="mainSidebar">
      <SideMenuJS />
      <div className="sideBar">
        <div className="sideBarLogo">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="smallLogo">
            <img src={LogoSm} alt="logo" className="smallLogo" />
          </div>
          <i className="ri-close-line closeIcon navToggle"></i>
          <div className="blackBox navToggle"></div>
        </div>
        {/* ======= Navigation ======= */}
        <div className="navigation">
          <nav>
            {/* About */}
            <ul
              className={`mainMenu ${webSize < 991 ? 'mobMenu' : ' webMenu'}`}
            >
              {navBarArray.map((res, i) => {
                return (
                  <>
                    <Navigator
                      name={res?.name}
                      path={res?.path}
                      navIcon={res?.navIcon}
                      onClick={res?.onClick && res?.onClick}
                    >
                      {res?.subMenu && (
                        <ul className={`subMenu`}>
                          <span className="subhead">{res?.name}</span>
                          {res?.subMenu?.map((subMenu) => {
                            console.log('data', subMenu);
                            return (
                              <Navigator
                                name={subMenu.subName}
                                path={subMenu.subPath}
                                onClick={subMenu.onClick}
                              />
                            );
                          })}
                        </ul>
                      )}
                    </Navigator>
                  </>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

export const SideMenuJS = () => {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    $('.subMenu').hide();

    // ============== sidemenu toggle ==================
    const handleNav = (event) => {
      const target = event.currentTarget;
      $('.subMenu').not($(target).next('.subMenu')).slideUp();
      $('.mainMenu i').not($(target).children('i')).removeClass('rotate90');
      $(target).next('.subMenu').slideToggle();
      $(target).children('i').toggleClass('rotate90');
    };
    $('.mainMenu.webMenu > li > a').on('click', handleNav);

    // ============== sidebar toggle ==================
    const handleSidebar = () => {
      // Sidemenu Off In Mobile Menu
      $('.subMenu').slideUp();
      $('.mainMenu i').removeClass('rotate90');
      // Mobile Menu Class
      $('.mainAdminGrid').toggleClass('webAdminGrid');
      $('.mainMenu').toggleClass('mobMenu webMenu');
      setMenu(menu ? false : true);
    };
    $('.navToggle').on('click', handleSidebar);

    return () => {
      $('.mainMenu > li > a').off('click', handleNav);
      $('.navToggle').off('click', handleSidebar);
    };
  }, [menu]);
  return null;
};
