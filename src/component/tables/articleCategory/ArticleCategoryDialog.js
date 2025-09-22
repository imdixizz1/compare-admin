/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import Button from '../../extra/Button';
import { ExInput } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryAdd,
  categoryUpdate,
} from '../../../redux/slice/articleCaegorySlice';
import { closeDialog } from '../../../redux/slice/dialogSlice';
import { baseURL } from '../../util/config';

const ArticleCategoryDialog = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  const [name, setName] = useState('');
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const [error, setError] = useState({
    image: '',
    name: '',
  });

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

  const handleSubmit = () => {
    if (!image || !imagePath || !name) {
      let error = {};
      if (!image) error.image = 'Image is required';
      if (!name) error.name = 'name is required';

      return setError({ ...error });
    }

    {
      const formData = new FormData();
      formData.append('icon', image);
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
      setImage(dialogueData?.icon);
      setImagePath( baseURL + dialogueData?.icon);
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
                  <h2 className="text-theme m0">Blog Category Dialog</h2>
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
                    </div>)}
                  <img
                    src={ imagePath ? imagePath : null}
                    alt=""
                    draggable="false"
                    className={`${(!imagePath || imagePath === '') && 'd-none'
                      } `}
                    data-class={`showImage`}
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>
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

export default ArticleCategoryDialog;
