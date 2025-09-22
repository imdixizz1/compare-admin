import React, { useEffect, useState } from 'react';
import Table from '../../extra/Table';
import Title from '../../extra/Title';
import Pagination from '../../extra/Pagination';
import Searching from '../../extra/Searching';
import UserAdd from './UserAdd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { userAll } from '../../../redux/slice/userSlice';
import { baseURL } from '../../util/config';
const User = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userAll());
  }, []);

  useEffect(() => {
    setData(user);
  }, [user]);

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

  const userTable = [
    {
      Header: 'No',
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: 'Profile Image',
      body: 'profileImage',
      Cell: ({ row }) => (
        <div
          className="userProfile"
          style={{ height: '50px', width: '50px', overflow: 'hidden' }}
        >
          <img src={baseURL + row.profileImage} alt="profileImage" />
        </div>
      ),
      sorting: { type: 'client' },
    },
    { Header: 'Customer Id', body: 'customerId', sorting: { type: 'client' } },
    { Header: 'Email', body: 'email', sorting: { type: 'client' } },
    { Header: 'Gender', body: 'gender', sorting: { type: 'client' } },
    {
      Header: 'Status',
      body: 'isOnline',
      Cell: ({ row }) => (
        <span
          className={`${
            row?.isOnline === true
              ? 'bg-success-light text-success'
              : 'bg-danger-light text-danger'
          } text-light p4 fs-10`}
        >
          {row?.isOnline ? 'Online' : 'Offline'}
        </span>
      ),
      sorting: { type: 'client' },
    },
    {
      Header: 'Block',
      body: 'isBlock',
      Cell: ({ row }) => (
        <span
          className={`${
            row?.isBlock === false
              ? 'bg-success-light text-success'
              : 'bg-danger-light text-danger'
          } text-light p4 fs-10`}
        >
          {row?.isBlock ? 'Block' : 'Unblock'}
        </span>
      ),
      sorting: { type: 'client' },
    },
  ];

  return (
    <div>
      <Title name={'ListJS'} />

      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                dispatch(openDialog({ type: 'user' }));
              }}
            />
          </div>
          <div className="col-md-5 col-smm-6 col-7 m0 ">
            <Searching
              button={false}
              type={`client`}
              data={data}
              setData={setData}
              column={userTable}
              onFilterData={handleFilterData}
              serverSearching={handleFilterData}
              searchValue={search}
              setSearchValue={setSearch}
            />
          </div>
        </div>
      </div>
      <Table
        data={data}
        mapData={userTable}
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

      {dialogue && dialogueType === 'user' && (
        <UserAdd setData={setData} data={data} />
      )}
      {/* <UserAdd /> */}
    </div>
  );
};

export default User;
