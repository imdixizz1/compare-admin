/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import Button from '../../extra/Button';
import { ExInput } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../redux/slice/dialogSlice';
import {
  subCategoryGet,
} from '../../../redux/slice/subCategorySlice';
import { featureAdd, featureUpdate } from '../../../redux/slice/featureSlice';
import { baseURL } from '../../util/config';

const FeatureDialogDirect = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const { subCategory } = useSelector((state) => state.subCategory);
  const [name, setName] = useState('');
  const [subcategoryId, setSubcategoryId] = useState();
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const [error, setError] = useState({
    subcategoryId: '',
    name: '',
    image: '',
    score: '',
  });

  useEffect(() => {
    let payload = {
      start: 1,
      limit: 25,
    };
    dispatch(subCategoryGet(payload));
  }, [dispatch]);

  const handleSubmit = () => {
    if (!subcategoryId || !image || !imagePath || !name) {
      let error = {};
      if (!subcategoryId) error.subcategoryId = 'subcategory is required';
      if (!name) error.name = 'name is required';
      if (!image) error.image = 'image is required';

      return setError({ ...error });
    }

    {
      const formData = new FormData();
      formData.append('icon', image);
      formData.append('featureName', name);
        let data = { formData, id: subcategoryId._id };
        dispatch(featureAdd(data)).unwrap();
    }
    dispatch(closeDialog());
  };

  useEffect(() => {
    if (dialogueData) {
      setSubcategoryId(dialogueData?.subcategoryId);
    }
  }, [dialogueData]);

  const handleImage = (e) => {
    if (!e.target.files) {
        setError((prevErrors) => ({
          ...prevErrors,
          image: "Image is Required",
        }));
      }
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
    setError((prevErrors) => ({
        ...prevErrors,
        image: "",
      }));
  };

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-4 col-md-6 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Feature Dialog</h2>
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
                      Subcategory
                    </label>
                    <div>
                      <select
                        name="category"
                        className="rounded-2 "
                        id="category"
                        value={subcategoryId}
                        onChange={(e) => {
                          setSubcategoryId(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...error,
                              subcategoryId: 'subcategoryId is Required !',
                            });
                          } else {
                            setError({
                              ...error,
                              subcategoryId: '',
                            });
                          }
                        }}
                      >
                        <option
                          value={
                            dialogueData ? dialogueData?.subcategoryId?._id : ''
                          }
                          selected
                          disabled={dialogueData && true}
                        >
                          {dialogueData
                            ? dialogueData?.subcategoryId?.name
                            : '--select subcategory--'}
                        </option>

                        {!dialogueData &&
                          subCategory.map((data) => {
                            return (
                              <option value={data._id}>{data?.name}</option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  {error?.subcategoryId && (
                    <div className="inputData">
                      <p className="errorMessage text-start text-capitalize">
                        {error && error?.subcategoryId}
                      </p>
                    </div>
                  )}
                </div>
                <div className="col-6">
                  <ExInput
                    label={`Image`}
                    id={`image`}
                    type={`file`}
                    onChange={(e) => handleImage(e)}
                    errorMessage={error && error?.image}
                    accept={'image/*'}
                  />
                                                      {error?.image && (
                                        <div className="inputData">
                                            <p className="errorMessage text-start text-capitalize">
                                                {error && error?.image}
                                            </p>
                                        </div>
                                    )}
                  <img
                    src={imagePath ? imagePath : null}
                    alt=""
                    draggable="false"
                    className={`${
                      (!imagePath || imagePath === '') && 'd-none'
                    } `}
                    data-class={`showImage`}
                    style={{ width: '100px', height: '100px' }}
                  />
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

export default FeatureDialogDirect;
