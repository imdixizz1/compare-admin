import { useState } from "react";
import Button from "./Button";

const Searching = (props) => {
  const [search, setSearch] = useState("");
  const { data, setData, type, serverSearching, button } = props;


  const handleSearch = (event) => {
    event.preventDefault();

    let searchValue = search ? search : event?.target?.value?.toLowerCase();
    // let searchValue = event.target.value.toLowerCase();
    if (type === "client") {
      if (searchValue) {
        const filteredData = data.filter((item) => {
          return Object.keys(item).some((key) => {
            if (key === "_id" || key === "updatedAt" || key === "createdAt") {
              return false;
            }
            const itemValue = item[key];
            if (typeof itemValue === "string") {
              return itemValue.toLowerCase().indexOf(searchValue) > -1;
            } else if (typeof itemValue === "number") {
              return itemValue.toString().indexOf(searchValue) > -1;
            }
            return false;
          });
        });
        setData(filteredData);
      } else {
        setData(data);
      }
    } else {
      serverSearching(searchValue);
    }
  };

  return (
    <>
      <div className="col-6 ms-auto">

        <div className="inputData">
          <input
            type="search"
            id="search"
            placeholder="Searching for..."
            className="bg-none m0-top"
            onChange={
              button
                ? (e) => setSearch(e.target.value)
                : (e) => handleSearch(e)
            }
          />
        </div>

      </div>
    </>
  );
};

export default Searching;
