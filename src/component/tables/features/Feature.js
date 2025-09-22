import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../extra/Pagination';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';

import { featureDelete, featureGet, handleSwitch } from '../../../redux/slice/featureSlice';
import FeatureDialog from './FeatureDialog';
import FeatureDialogDirect from './FeatureDialogDirect';
import { baseURL } from '../../util/config';
import ToggleSwitch from '../../extra/ToggleSwitch';

const Feature = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const { total, feature } = useSelector((state) => state.feature);

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
    };
    dispatch(featureGet(payload));
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    setData(feature);
  }, [feature]);

  console.log('feature', feature);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event));
    setPage(1);
  };

  const [type, setType] = useState(1);

    const manageSwitches = (id) =>{

      dispatch(handleSwitch(id))
    }

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        console.log('yes', yes);
        if (yes) {
          dispatch(featureDelete(id));
        }
      })
      .catch((err) => console.log(err));
  };

  const categoryTable = [
    {
      Header: 'No',
      Cell: ({ index }) => (
        <span>{(page * rowsPerPage) - rowsPerPage + (parseInt(index) +1)}</span>
      ),
    },
    {
      Header: 'Icon',
      // body: "image",
      Cell: ({ row }) => (
        <div
          className="userProfile"
          style={{ height: '100px', width: '150px', overflow: 'hidden' }}
        >
          <img src={baseURL +row?.icon} alt="Article" height={`100%`} />
        </div>
      ),
    },
    {
      Header: 'Feature Name',
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.featureName}</span>
      ),
    },
    {
      Header: 'Subcategory',
      Cell: ({ row }) => (
        <span className="text-capitalize cursor fw-bold" onClick={() => handleAddDirect(row)}>{row?.subcategoryId?.name}</span>
      ),
    },
    {
      Header: 'On/Off',
      body:"isPopular",
      sorting: { type: 'client' },
      Cell: ({ row }) => (
        <ToggleSwitch
          value={row?.isAtive}
          onClick={() => 
              manageSwitches(row?._id,"isActive")
          }
        />
      ),
    },
    {
      Header: 'CreatedAt',
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.createdAt?.split('T')[0]}</span>
      ),
    },

    {
      Header: 'Action',
      Cell: ({ row }) => (
        <span>
          <button
            className="bg-success text-light m10-right p15-x p6-y fs-15"
            onClick={() => handleUpdate(row)}
          >
            Edit
          </button>
          <button
            className="bg-danger text-light p15-x p6-y fs-15"
            onClick={() => handleDelete(row._id)}
          >
            DELETE
          </button>
        </span>
      ),
      width: '300px',
    },
  ];

  const handleUpdate = (data) => {
    dispatch(openDialog({ type: 'feature', data: data }));
  };

  const handleAddDirect = (data) => {
    dispatch(openDialog({ type: 'featureDirect', data: data }));
  };

  return (
    <div>
      <Title name={'Features'} />

      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          {dialogue && dialogueType == 'feature' && <FeatureDialog />}
          {dialogue && dialogueType == 'featureDirect' && <FeatureDialogDirect />}
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                dispatch(openDialog({ type: 'feature' }));
              }}
            />
          </div>
        </div>
      </div>
      <Table
        data={data}
        mapData={categoryTable}
        serverPerPage={rowsPerPage}
        type={'server'}
      />
      <Pagination
        type={'server'}
        serverPage={page}
        setServerPage={setPage}
        serverPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalData={total}
      />
    </div>
  );
};

export default Feature;
