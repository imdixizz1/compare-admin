/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import Button from '../../extra/Button';
import { ExInput } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../redux/slice/dialogSlice';
import {
  subCategoryAdd,
  subCategoryUpdate,
} from '../../../redux/slice/subCategorySlice';
import { categoryGet } from '../../../redux/slice/categorySlice';

const SubCategoryDialog = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const { category } = useSelector((state) => state.category);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [error, setError] = useState({
    categoryId: '',
    name: '',
  });

  useEffect(() => {
    let payload = {
      start: 1,
      limit: 25,
    };
    dispatch(categoryGet(payload));
  },[dispatch]);

  const handleSubmit = () => {
    if (!categoryId || !name) {
      let error = {};
      if (!categoryId) error.categoryId = 'Image is required';
      if (!name) error.name = 'name is required';

      return setError({ ...error });
    }

    {
      let data = {
        name,
        categoryId,
      };
      if (dialogueData) {
        const payload = { name, id: dialogueData?._id };
        dispatch(subCategoryUpdate(payload)).unwrap();
      } else {
        dispatch(subCategoryAdd(data)).unwrap();
      }
    }
    dispatch(closeDialog());
  };

  useEffect(() => {
    if (dialogueData) {
      setName(dialogueData?.name);
      setCategoryId(dialogueData?.categoryId);
    }
  }, [dialogueData]);

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-4 col-md-6 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Product subcategory Dialog</h2>
                </div>
                <div className="col-4">
                  <div
                    className="closeButton"
                    onClick={() => {
                      dispatch(closeDialog());
                    }}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              </div>
              <div className="row align-items-start formBody">
                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`fname`}
                    name={`fname`}
                    value={name}
                    label={`Name`}
                    placeholder={`Name`}
                    errorMessage={error.name && error.name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          name: ` Name Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          name: '',
                        });
                      }
                    }}
                  />
                </div>
                <div class="col-12 col-md-6">
                  <div className="inputData">
                    <label className=" " htmlFor="category">
                      Category
                    </label>
                    <div>
                      <select
                        name="category"
                        className="rounded-2 "
                        id="category"
                        value={categoryId}
                        onChange={(e) => {
                            
                          setCategoryId(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...error,
                              categoryId: 'categoryId is Required !',
                            });
                          } else {
                            setError({
                              ...error,
                              categoryId: '',
                            });
                          }
                        }}
                      >
                        <option
                          value={
                            dialogueData ? dialogueData?.categoryId?._id : ''
                          }
                          selected
                          disabled={dialogueData && true}
                        >
                          {dialogueData
                            ? dialogueData?.categoryId?.name
                            : '--select category--'}
                        </option>
                        

                        { !dialogueData && category.map((data) => {
                          return <option value={data._id}>{data?.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  {error?.categoryId && (
                    <div className="inputData">
                      <p className="errorMessage text-start text-capitalize">
                        {error && error?.categoryId}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="row  formFooter">
                <div className="col-12 text-end m0">
                  <Button
                    className={`bg-gray text-light`}
                    text={`Cancel`}
                    type={`button`}
                    onClick={() => dispatch(closeDialog())}
                  />
                  <Button
                    type={`submit`}
                    className={`bg-theme text-light m10-left`}
                    text={`Submit`}
                    onClick={(e) => handleSubmit(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryDialog;
