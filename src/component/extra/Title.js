import React from 'react';

const Title = (props) => {
  const { name } = props;
  return (
    <div className='mainTitle d-flex align-items-center justify-content-between cursor-pointer'>
      <div className="title text-uppercase fw-600 ">{name}</div>
      <div className="titlePath">
        <span>Dashboard  <i className="ri-arrow-right-s-line"></i></span>
        <span className='text-second'> {name}</span>
      </div>
    </div>
  );
}

export default Title;
