import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../extra/Pagination';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';
import {
  categoryDelete,
  categoryGet,
  trendingArticleCategory,
} from '../../../redux/slice/articleCaegorySlice';
import ToggleSwitch from '../../extra/ToggleSwitch';
import ArticleCategoryDialog from './ArticleCategoryDialog';
import { baseURL } from '../../util/config';

const ArticleCategory = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const { articleCategory, total } = useSelector(
    (state) => state.articleCategory
  );

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
    };
    dispatch(categoryGet(payload));
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    setData(articleCategory);
  }, [articleCategory]);

  console.log('articleCategory', articleCategory);

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
          dispatch(categoryDelete(id));
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
          style={{ height: '60px', width: '80px', overflow: 'hidden' }}
        >
          <img src={baseURL +row?.icon} alt="Article" height={`100%`} />
        </div>
      ),
    },
    {
      Header: 'Name',
      Cell: ({ row }) => <span className="text-capitalize">{row?.name}</span>,
    },
    // {
    //   Header: 'Trending',
    //   body: 'isTrending',
    //   sorting: { type: 'client' },
    //   Cell: ({ row }) => (
    //     <ToggleSwitch
    //       value={row?.isTrending}
    //       onClick={() => {
    //         dispatch(trendingArticleCategory(row?._id));
    //       }}
    //     />
    //   ),
    // },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <span>
          <button
            className="bg-success text-light m10-right p15-x p6-y fs-15"
            onClick={() =>
              dispatch(openDialog({ type: 'articleCategory', data: row }))
            }
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

  return (
    <div>
      <Title name={'Blog Category'} />

      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                dispatch(openDialog({ type: 'articleCategory' }));
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

      {dialogue && dialogueType === 'articleCategory' && (
        <ArticleCategoryDialog setData={setData} data={data} />
      )}
    </div>
  );
};

export default ArticleCategory;
