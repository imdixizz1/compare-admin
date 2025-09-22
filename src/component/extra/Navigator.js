import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigator = (props) => {
  const location = useLocation();


  const { name, path, navIcon, onClick } = props;


  return (

    <li onClick={onClick} key={`navHade`}>
      <Link
        to={{ pathname: path }}
        className={`${location.pathname === path && "activeMenu"} betBox`}
      >
        <div >
          {navIcon && <i className={`${navIcon}`}></i>}
          <span className="text-capitalize">{name}</span>
        </div>
        {props?.children && <i className="ri-arrow-right-s-line fs-18"></i>}
      </Link>
      {/* If Submenu */}
      {props.children}
    </li>
  );
};

export default Navigator;
