import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../extra/Pagination';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';

import { featureDelete, featureGet } from '../../../redux/slice/featureSlice';
// import FeatureDialog from './FeatureDialog';
import { handleSwitch, subFeatureDelete, subFeatureGet } from '../../../redux/slice/subFeatureSlice';
import ToggleSwitch from '../../extra/ToggleSwitch';
import SubFeatureDialog from './SubFeatureDialog';
import SubFeatureDialogDirect from './SubFeatureDialogDirect';
import { baseURL } from '../../util/config';

const SubFeature = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const { total, subFeature } = useSelector((state) => state.subFeature);

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
    };
    dispatch(subFeatureGet(payload));
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    setData(subFeature);
  }, [subFeature]);

  console.log('subFeature', subFeature);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event));
    setPage(1);
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        console.log('yes', yes);
        if (yes) {
          dispatch(subFeatureDelete(id));
        }
      })
      .catch((err) => console.log(err));
  };

  const manageSwitches = (id,type) =>{
    const payload = {
        id,
        type
    }
    dispatch(handleSwitch(payload))
  }

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
          <img src={baseURL+  row?.icon} alt="Article" height={`100%`} />
        </div>
      ),
    },
    {
      Header: 'Feature',
      Cell: ({ row }) => (
        <span className="text-capitalize cursor fw-bold" onClick={() => handleAddDirect(row)}>{row?.name}</span>
      ),
    },
    {
        Header: 'Use For Filter',
        body:"isConsiderForFilter",
        sorting: { type: 'client' },
        Cell: ({ row }) => (
          <ToggleSwitch
            value={row?.isConsiderForFilter}
            onClick={() => 
                manageSwitches(row?._id,"isConsiderForFilter")
            }
          />
        ),
      },
      {
        Header: 'isPopular',
        body:"isPopular",
        sorting: { type: 'client' },
        Cell: ({ row }) => (
          <ToggleSwitch
            value={row?.isPopular}
            onClick={() => 
                manageSwitches(row?._id,"isPopular")
            }
          />
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
    dispatch(openDialog({ type: 'subfeature', data: data }));
  };
  const handleAddDirect = (data) => {
    dispatch(openDialog({ type: 'subfeatureDirect', data: data }));
  };

  return (
    <div>
      <Title name={'Subfeature'} />

      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          {dialogue && dialogueType == 'subfeature' && <SubFeatureDialog />}
          {dialogue && dialogueType == 'subfeatureDirect' && <SubFeatureDialogDirect />}
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                dispatch(openDialog({ type: 'subfeature' }));
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

export default SubFeature;
