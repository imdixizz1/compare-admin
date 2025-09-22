import React, { useState } from "react";
import { isSkeleton } from "../util/allSelector";
import { useSelector } from "react-redux";


function Table(props) {

  const roleSkeleton = useSelector(isSkeleton);
  const { data, mapData, Page, PerPage, onChildValue, className } = props;

  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleColumnClick = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData =
    data?.length > 0 &&
    [...data]?.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

  const handleClick = (value) => {
    // Replace with your actual value
    onChildValue(value); // Invoke the callback function in the parent component
  };

  console.log("roleSkeleton", roleSkeleton);


  return (
    <div className="mainTable">

      <table width="100%" border className={`primeTable text-center ${className}`}>
        {roleSkeleton ? (
          <>
            <thead >
              <tr>
                {mapData.map((res, i) => {
                  return (
                    <th className={`fw-bold ${res.thClass}`} key={`thade`} width={res.width} style={{ minWidth: res.width ? res.width : "100px" }}>
                      <div className={`${res.thClass}`}>
                        <div className="skeleton" style={{ height: "10px", width: "70%" }}>{`${" "}`}</div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {
                Array(6).fill().map(() => {
                  return (
                    <>
                      <tr key={`table`} style={{ height: "80px" }}>
                        {mapData?.map((res) => {
                          return (
                            <td key={`tbody`}>
                              <div className="skeleton" style={{ height: "20px", width: "70%" }}></div>
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </>
        ) : (
          <>
            <thead >
              <tr>
                {mapData.map((res, i) => {
                  return (
                    <th className={`fw-bold ${res.thClass}`} key={`thade`} width={res.width}>
                      <div className={`betBox ${res.thClass}`}>
                        <div>{`${" "}${res.Header}`}</div>
                        {res?.sorting?.type === "server" && (
                          <i
                            className="ri-expand-up-down-fill deg90 ms-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick(res.body)}
                          ></i>
                        )}
                        {res?.sorting?.type === "client" && (
                          <i
                            className="ri-expand-up-down-fill deg90 ms-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleColumnClick(res.body)}
                          ></i>
                        )}
                      </div>
                    </th>
                  );
                })}
                </tr>
              </thead>
              <tbody>
                {sortedData.length > 0 ? (
                  <>
                    {(PerPage > 0
                      ? sortedData.slice(
                        Page * PerPage,
                        Page * PerPage + PerPage
                      )
                      : sortedData
                    ).map((i, k) => {
                      return (
                        <>
                          <tr key={`table`}>
                            {mapData?.map((res) => {
                            return (
                              <td key={`tbody`} className={res.tdClass}>
                                {res.Cell ? (
                                  <res.Cell row={i} index={k} />
                                ) : (
                                  <span>
                                    {i[res?.body]}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      </>
                    );
                  })}
                  </>
                ) : (
                  <tr>
                    <td colSpan="25" className="text-center">
                      No Data Found !
                    </td>
                  </tr>
                )}
              </tbody>

          </>
        )}

      </table>

    </div>
  );
}

export default Table;
