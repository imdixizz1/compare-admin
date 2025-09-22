import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../extra/Pagination';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';
import { subCategoryDelete, subCategoryGet } from '../../../redux/slice/subCategorySlice';
import ToggleSwitch from '../../extra/ToggleSwitch';
import logo from '../../../assets/images/male.png';
import { useNavigate } from 'react-router-dom';
import SubCategoryDialog from './SubCategoryDialog';
import SubCategoryDialogDirect from './SubCategoryDialogDirect';

const SubCategory = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const {  total } = useSelector((state) => state.subCategory);
  const  subCategory= useSelector((state) => state.subCategory.subCategory);

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
    };
    dispatch(subCategoryGet(payload));
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    setData(subCategory);
  }, [subCategory]);

  console.log('subCategory', subCategory);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event));
    setPage(1);
  };

  const [type, setType] = useState(1);

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        console.log('yes', yes);
        if (yes) {
            dispatch(subCategoryDelete(id));
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
      Header: 'Name',
      Cell: ({ row }) => <span className="text-capitalize">{row?.name}</span>,
    },
    {
      Header: 'Product Category',
      Cell: ({ row }) => (
        <span className="text-capitalize cursor fw-bold" onClick={() => handleAddDirect(row)}>{row?.categoryId?.name}</span>
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

  const navigate = useNavigate();

  const handleUpdate = (data) => {
    dispatch(openDialog({ type: 'subcategory',data:data}));
  };

  const handleAddDirect = (data) => {
    dispatch(openDialog({ type: 'subcategoryDirect',data}));
  };

  return (
    <div>
      <Title name={'Product subcategory'} />

      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          {dialogue && dialogueType == 'subcategory' && <SubCategoryDialog />}
          {dialogue && dialogueType == 'subcategoryDirect' && <SubCategoryDialogDirect />}
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                dispatch(openDialog({ type: 'subcategory' }));
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

      {/* {dialogue && dialogueType === 'articleCategory' && (
        <ArticleCategoryDialog setData={setData} data={data} />
      )} */}
    </div>
  );
};

export default SubCategory;
