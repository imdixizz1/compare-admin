/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import Button from '../../extra/Button';
import { ExInput } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryAdd,
  categoryUpdate,
} from '../../../redux/slice/categorySlice';
import { closeDialog } from '../../../redux/slice/dialogSlice';
import { baseURL } from '../../util/config';

const CategoryDialog = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const [sIcon, setSIcon] = useState([]);
  const [sIconPath, setSIconPath] = useState('');
  const [bIcon, setBIcon] = useState([]);
  const [bIconPath, setBIconPath] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({
    bIcon: '',
    sIcon: '',
    name: '',
  });

  const handleImage = (e) => {
    if (!e.target.files) {
      setError((prevErrors) => ({
        ...prevErrors,
        sIcon: "Image is Required",
      }));
    }
    setSIcon(e.target.files[0]);
    setSIconPath(URL.createObjectURL(e.target.files[0]));
    setError((prevErrors) => ({
      ...prevErrors,
      sIcon: "",
    }));
  };
  const handleImage2 = (e) => {
    if (!e.target.files) {
      setError((prevErrors) => ({
        ...prevErrors,
        bIcon: "Image is Required",
      }));
    }
    setBIcon(e.target.files[0]);
    setBIconPath(URL.createObjectURL(e.target.files[0]));
    setError((prevErrors) => ({
      ...prevErrors,
      bIcon: "",
    }));
  };

  const handleSubmit = () => {
    if (!sIcon || !sIconPath || !name || !bIcon || !bIconPath) {
      let error = {};
      if (!sIcon) error.sIcon = 'sIcon is required';
      if (!bIcon) error.bIcon = 'sIcon is required';
      if (!name) error.name = 'name is required';

      return setError({ ...error });
    }

    {
      const formData = new FormData();
      formData.append('sIcon', sIcon);
      formData.append('bIcon', bIcon);
      formData.append('name', name);

      if (dialogueData) {
        const payload = { data: formData, id: dialogueData?._id };
        dispatch(categoryUpdate(payload)).unwrap();
      } else {
        dispatch(categoryAdd(formData)).unwrap();
      }
    }
    dispatch(closeDialog());
  };

  useEffect(() => {
    if (dialogueData) {
      setName(dialogueData?.name);
      setSIcon(dialogueData?.sIcon);
      setSIconPath (baseURL + dialogueData?.sIcon);
      setBIcon(dialogueData?.bIcon);
      setBIconPath(baseURL + dialogueData?.bIcon);
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
                  <h2 className="text-theme m0"> Category Dialog</h2>
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
                <div className="col-6">
                  <ExInput
                    label={`Small Icon`}
                    id={`image`}
                    type={`file`}
                    onChange={(e) => handleImage(e)}
                    errorMessage={error && error?.sIcon}
                    accept={'image/*'}
                  />
                  {error?.sIcon && (
                    <div className="inputData">
                      <p className="errorMessage text-start text-capitalize">
                        {error && error?.sIcon}
                      </p>
                    </div>
                  )}
                  <img
                    src={sIconPath ? sIconPath : null}
                    alt=""
                    draggable="false"
                    className={`${(!sIconPath || sIconPath === '') && 'd-none'
                      } `}
                    data-class={`showImage`}
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>

                <div className="col-6">
                  <ExInput
                    label={`Big Icon`}
                    id={`image`}
                    type={`file`}
                    onChange={(e) => handleImage2(e)}
                    errorMessage={error && error?.bIcon}
                    accept={'image/*'}
                  />
                  {error?.bIcon && (
                    <div className="inputData">
                      <p className="errorMessage text-start text-capitalize">
                        {error && error?.bIcon}
                      </p>
                    </div>
                  )}
                  {bIconPath && (
                    <img
                      src={bIconPath ?bIconPath : null}
                      alt=""
                      draggable="false"
                      className={`${(!bIconPath || bIconPath === '') && 'd-none'
                        } `}
                      data-class={`showImage`}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <ExInput
                    type={`text`}
                    id={`name`}
                    name={`name`}
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

export default CategoryDialog;
