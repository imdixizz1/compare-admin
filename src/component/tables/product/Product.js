import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../extra/Pagination';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';
import { articleDelete, articleGet } from '../../../redux/slice/articleSlice';
import ToggleSwitch from '../../extra/ToggleSwitch';
import logo from '../../../assets/images/male.png';
import { useNavigate } from 'react-router-dom';
import { productGet } from '../../../redux/slice/productSlice';
import { baseURL } from '../../util/config';
// import ArticleCategoryDialog from './ArticleCategoryDialog';

const Product = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const { product, total } = useSelector((state) => state.product);

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
      isVisible:true
    };
    dispatch(productGet(payload));
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    
    setData(product);
  }, [product]);

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
          dispatch(articleDelete(id));
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
      Header: 'Image',
      Cell: ({ row }) => (
        <div
          className="userProfile"
          style={{ height: '100px', width: '100px' }}
        >
          <img
            src={baseURL +row?.image[0]}
            alt="product"
            height={`100%`}
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = logo;
            }}
          />
        </div>
      ),
    },
    {
      Header: 'Thumbnail',
      Cell: ({ row }) => (
        <div
          className="userProfile"
          style={{ height: '100px', width: '100px' }}
        >
          <img
            src={baseURL +row?.thumbnail}
            alt="product"
            height={`100%`}
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = logo;
            }}
          />
        </div>
      ),
    },
    {
      Header: 'Title',
      Cell: ({ row }) => <span className="text-capitalize">{row?.title}</span>,
    },
    {
      Header: 'Price',
      Cell: ({ row }) => <span className="text-capitalize">{row?.price}</span>,
    },
    {
      Header: 'Score',
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.scoreValue}</span>
      ),
    },
    {
      Header: 'Category',
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.categoryId?.name}</span>
      ),
    },
    {
      Header: 'Subcategory',
      Cell: ({ row }) => (
        <span className="text-capitalize">{row?.subCategoryId?.name}</span>
      ),
    },

    {
      Header: 'Action',
      Cell: ({ row }) => (
        <span>
          <button
            className="bg-success text-light m5-right p10-x p4-y fs-12"
            onClick={() => handleUpdate(row._id)}
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

  const navigate = useNavigate();

  const handleUpdate = (data) => {
    navigate('/admin/product/create', {
      state: {
        id: data,
      },
    });
  };

  const handleCreate = (data) => {
    navigate('/admin/product/create', {
      state: {
        id: null,
      },
    });
  };

  return (
    <div>
      <Title name={'Product'} />

      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          {/* {dialogue && dialogueType == 'article' && <ArticleInfo />} */}
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                handleCreate()
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

export default Product;
