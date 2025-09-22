import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import { attributesGet } from '../../../redux/slice/attributesSlice';
import Pagination from '../../extra/Pagination';
import Searching from '../../extra/Searching';
import { openDialog } from '../../../redux/slice/dialogSlice';
import AttributesDialogue from './AttributesDialogue';

const Attributes = () => {
  const dispatch = useDispatch();
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);

  const { attributes } = useSelector((state) => state.attributes);

  useEffect(() => {
    dispatch(attributesGet());
  }, []);

  useEffect(() => {
    setData(attributes);
  }, [attributes]);

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

  const attributesTable = [
    {
      Header: 'No',
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: 'Attributes Name',
      body: 'attrName',
      sorting: { type: 'client' },
      width: '200px',
    },
    {
      Header: 'Details',
      body: 'details',
      width: '800px',
      Cell: ({ row }) => (
        <span className="attrDetails" style={{ minWidth: '400px' }}>
          {row?.details?.map((res) => {
            return (
              <div>
                {row.attrName == 'Color' && (
                  <span
                    style={{ backgroundColor: `${res}` }}
                    className="colorBall"
                  ></span>
                )}
                <span>{res}</span>
              </div>
            );
          })}
        </span>
      ),
    },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <span>
          <button
            className="bg-success text-light m5-right p10-x p4-y fs-12"
            onClick={() =>
              dispatch(openDialog({ type: 'attributes', data: row }))
            }
          >
            Edit
          </button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Title name={'Attributes'} />

      {/* <div className='bg-light p15'>
        <div className="row justify-content-between align-items-center">
          <div className="col-2 m0"></div>
          <div className="col-md-5 col-smm-6 col-7 m0 ">
            <Searching
              button={false}
              type={`client`}
              data={data}
              setData={setData}
              column={attributesTable}
              onFilterData={handleFilterData}
              serverSearching={handleFilterData}
              searchValue={search}
              setSearchValue={setSearch}
            />
          </div>
        </div>
      </div> */}
      <Table
        data={data}
        mapData={attributesTable}
        PerPage={rowsPerPage}
        Page={page}
        type={'client'}
        onChildValue={handleChildValue}
      />

      {dialogue && dialogueType === 'attributes' && (
        <AttributesDialogue setData={setData} data={data} />
      )}
    </div>
  );
};

export default Attributes;
