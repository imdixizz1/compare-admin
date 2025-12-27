import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import { bannerDelete, bannerGet } from '../../../redux/slice/bannerSlice';
import { baseURL } from '../../util/config';
import Pagination from '../../extra/Pagination';
import Searching from '../../extra/Searching';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';
import UnitDialog from './UnitDialog';

const Unit = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);

  const { banner } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(bannerGet());
  }, []);

  useEffect(() => {
    setData(banner);
  }, [banner]);

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event));
    setPage(1);
  };

  const [search, setSearch] = useState('');
  const handleFilterData = (filteredData) => {
    if (typeof filteredData === 'string') {
      setSearch(filteredData);
    } else {
      setData(filteredData);
    }
  };
  // const [field, setField] = useState("date");
  const [type, setType] = useState(1);
  const handleChildValue = (value) => {
    setType(type === 0 ? 1 : 0);
    // setField(value);
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        console.log('yes', yes);
        if (yes) {
          dispatch(bannerDelete(id));
        }
      })
      .catch((err) => console.log(err));
  };

  const bannerTable = [
    {
      Header: 'No',
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: 'Banner Image',
      // body: "image",
      Cell: ({ row }) => (
        <div
          className="userProfile"
          style={{ height: '100px', width: '150px', overflow: 'hidden' }}
        >
          <img src={baseURL + row.image} alt="image" height={`100%`} />
        </div>
      ),
      sorting: { type: 'client' },
      width: '300px',
    },
    { Header: 'Url', body: 'url', sorting: { type: 'client' } },
    {
      Header: 'Status',
      // body: "isActive",
      Cell: ({ row }) => (
        <button
          className={` ${
            row?.isActive === true
              ? 'bg-success-light text-success'
              : 'bg-danger-light text-danger'
          } p10-x p4-y fs-12`}
        >
          {row?.isActive ? 'On' : 'Off'}
        </button>
      ),
      sorting: { type: 'client' },
      width: '200px',
    },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <span>
          <button
            className="bg-success text-light m5-right p10-x p4-y fs-12"
            onClick={() => dispatch(openDialog({ type: 'banner', data: row }))}
          >
            Edit
          </button>
          <button
            className="bg-danger text-light p10-x p4-y fs-12"
            onClick={() => handleDelete(row._id)}
          >
            DELETE
          </button>
        </span>
      ),
      width: '300px',
    },
  ];

  return (
    <div>
      <Title name={'Banner'} />

      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                dispatch(openDialog({ type: 'unit' }));
              }}
            />
          </div>
          <div className="col-md-5 col-smm-6 col-7 m0 ">
            <Searching
              type={`client`}
              data={banner}
              setData={setData}
              column={bannerTable}
              serverSearching={handleFilterData}
            />
          </div>
        </div>
      </div>
      <Table
        data={data}
        mapData={bannerTable}
        PerPage={rowsPerPage}
        Page={page}
        type={'client'}
        onChildValue={handleChildValue}
      />
      <Pagination
        type={'client'}
        serverPage={page}
        setServerPage={setPage}
        serverPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalData={data?.length}
      />

      {dialogue && dialogueType === 'unit' && (
        <UnitDialog setData={setData} data={data} />
      )}
    </div>
  );
};

export default Unit;
