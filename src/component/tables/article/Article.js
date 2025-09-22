import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../extra/Pagination';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';
import { articleDelete, articleGet, blockOrNot, trendingArticleCategory } from '../../../redux/slice/articleSlice';
import ToggleSwitch from '../../extra/ToggleSwitch';
import logo from '../../../assets/images/male.png';
import ArticleInfo from './ArticleInfo';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../util/config';

const Article = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const { article, total } = useSelector((state) => state.article);

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
    };
    dispatch(articleGet(payload));
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    setData(article);
  }, [article]);

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
        <span>{(page * rowsPerPage) - rowsPerPage + (parseInt(index) + 1)}</span>
      ),
    },
    {
      Header: 'Thumbnail',
      Cell: ({ row }) => (
        <div
          className="userProfile"
          style={{ height: '80px', width: '80px' }}
        >
          <img
            src={baseURL + row?.thumbnail}
            alt="thumbnail"
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
      Header: 'Main Image',
      Cell: ({ row }) => (
        <div
          className="userProfile"
          style={{ height: '80px', width: '80px', overflow: 'hidden' }}
        >
          <img
            src={baseURL + row?.image[0]}
            alt="mainImage"
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
      Cell: ({ row }) => <TruncatedText text={row?.title} maxLength={30} />, // Use TruncatedText here
    },
    {
      Header: 'Category',
      Cell: ({ row }) => (
        <span
          className="text-capitalize pointer"
          onClick={() => handleCreateDirect(row)}
        >
          {row?.articleCategoryId?.name}
        </span>
      ),
    },
    {
      Header: 'IsBlock',
      Cell: ({ row }) => (
        <ToggleSwitch
          value={row?.isBlock}
          onClick={() => {
            dispatch(blockOrNot(row?._id));
          }}
        />
      ),
    },
    {
      Header: 'Trending',
      Cell: ({ row }) => (
        <ToggleSwitch
          value={row?.isTrending}
          onClick={() => {
            dispatch(trendingArticleCategory(row?._id));
          }}
        />
      ),
    },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <span>
          <button
            className="bg-success text-light m10-right p8-x p4-y fs-15"
            onClick={() => handleUpdate(row)}
          >
            Edit
          </button>
          <button
            className="bg-danger text-light p8-x p4-y fs-15"
            onClick={() => handleDelete(row._id)}
          >
            DELETE
          </button>
        </span>
      ),
    },
  ];

  const navigate = useNavigate();

  const handleUpdate = (data) => {
    navigate('/admin/article/create', {
      state: { data },
    });
  };

  const handleCreateDirect = (data) => {
    navigate('/admin/article/createDirect', {
      state: { data },
    });
  };

  return (
    <div>
      <Title name={'Blogs'} />
      <div className="bg-light p15">
        <div className="row justify-content-between align-items-center">
          {dialogue && dialogueType === 'article' && <ArticleInfo />}
          <div className="col-2 m0">
            <Button
              className={`bg-second text-light`}
              text={`ADD`}
              bIcon={`ri-add-line`}
              onClick={() => {
                navigate('/admin/article/create');
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

// TruncatedText Component at the Bottom
const TruncatedText = ({ text, maxLength = 25 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  if (!text) return null;

  return (
    <span>
      {isExpanded ? text : text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')}
      {text.length > maxLength && (
        <button
          onClick={toggleText}
          style={{
            border: 'none',
            background: 'none',
            color: 'blue',
            cursor: 'pointer',
            marginLeft: '5px',
          }}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </span>
  );
};

export default Article;
