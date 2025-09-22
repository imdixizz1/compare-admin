import React, { useEffect, useState } from "react";
import { Select } from "./Input";


const Pagination = (props) => {
 
  const [pages, setPages] = useState([]);
  const {
    type,
    serverPage,
    setServerPage,
    serverPerPage,
    onPageChange,
    onRowsPerPageChange,
    totalData,
  } = props;


  const onPageChangeClient = (serverPage) => {
    setServerPage(serverPage);
  };


 


  useEffect(() => {
   
    const totalPages = Math.ceil(totalData / serverPerPage);
    const range = Math.min(3, totalPages);
    const start = Math.max(1, serverPage - Math.floor(range / 2));
    const end = Math.min(start + range, totalPages);


    const pageNumbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );


    setPages(pageNumbers);
  }, [serverPage, totalData, serverPerPage]);


 
  const totalCount = Math.min((serverPage * serverPerPage) , totalData);


  const handleBackButtonClick = (event) => {
    onPageChange(event, serverPage - 1);
  };


  const handleNextButtonClick = (event) => {
    onPageChange(event, serverPage + 1);
  };


  const option = [5, 10, 25, 50, 100, 200];


  return (
    <div className="pagination">
      <>
        {totalData > 0 && (
          <div className="client-pagination betBox w-100">
            <div className="tableRang midBox">
              <Select
                id={`pagination`}
                option={option}
                defaultValue={serverPerPage}
                label={`Show `}
                onChange={onRowsPerPageChange}
                className={`midBox paginationSelect`}
                btnClass={`mt-0`}
                angle={true}
              />
              <p className="count">
                {`${parseInt(serverPage * serverPerPage) - (serverPerPage  ) + 1 } - ${totalCount} of ${totalData}`}
              </p>
            </div>
            <div className="tableAccess">
              <div className="d-flex m15-left mainPaginatinBtn">
                <button
                  className={`paginationBtn ${serverPage === 1 && "pageBtnDisable"}`}
                  disabled={serverPage === 1}
                  // style={{ backgroundColor: "#fff" }}
                  onClick={() => onPageChangeClient(1)}
                >
                  <i className="ri-arrow-left-double-fill" style={{ fontSize: "29px" }}></i>
                </button>
                <button
                  className={`paginationBtn ${serverPage === 1 && "pageBtnDisable"}`}
                  disabled={serverPage === 1}
                  // style={{ backgroundColor: "#fff" }}
                  onClick={() => handleBackButtonClick()}
                >
                  <i className="ri-arrow-left-s-line" style={{ fontSize: "29px" }}></i>
                </button>
                {type === "server" &&
                  pages.map((serverPages) => (
                    <button
                      key={serverPages}
                      onClick={() => onPageChangeClient(serverPages)}
                      className={`paginationBtn paginationNumber ${serverPage === serverPages ? "active" : "active-btn"}`}
                    >
                      {serverPages}
                    </button>
                  ))}
                <button
                  className={`paginationBtn ${serverPage === Math.ceil(totalData / serverPerPage) && "pageBtnDisable"}`}
                  disabled={serverPage === Math.ceil(totalData / serverPerPage)}
                  // style={{ backgroundColor: "#fff" }}
                  onClick={() => handleNextButtonClick()}
                >
                  <i className="ri-arrow-right-s-line" style={{ fontSize: "29px" }}></i>
                </button>
                <button
                  className={`paginationBtn ${serverPage === Math.ceil(totalData / serverPerPage) && "pageBtnDisable"}`}
                  disabled={serverPage === Math.ceil(totalData / serverPerPage)}
                  // style={{ backgroundColor: "#fff" }}
                  onClick={() => onPageChangeClient(Math.ceil(totalData / serverPerPage))}
                >
                  <i className="ri-arrow-right-double-line" style={{ fontSize: "29px" }}></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};


export default Pagination;



