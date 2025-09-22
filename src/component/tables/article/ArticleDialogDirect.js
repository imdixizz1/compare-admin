/* eslint-disable no-lone-blocks */
import { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import { ExInput, Textarea } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import { categoryGet } from '../../../redux/slice/articleCaegorySlice';
import ReactDropzone from 'react-dropzone';
import Button from '../../extra/Button';
import { articleAdd, articleUpdate } from '../../../redux/slice/articleSlice';
import { useLocation } from 'react-router-dom';
import { baseURL } from '../../util/config';

const ArticleDialogDirect = () => {
  const [title, setTitle] = useState('');
  const [imageCredit, setImageCredit] = useState('');
  const [imageType, setImageType] = useState(2);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const { state } = useLocation();
  const [error, setError] = useState({
    title: '',
    imageCredit: '',
    imageType: '',
    images: '',
    categoryId: '',
    thumbnail: '',
    content: '',
    url: '',
  });

  const dialogueData = state?.data;

  console.log('dialogueData', dialogueData);
  useEffect(() => {
    if (dialogueData) {
      setCategoryId(dialogueData?.articleCategoryId);
    }
  }, [dialogueData]);

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      start: 1,
      limit: 50,
    };
    dispatch(categoryGet(payload));
  }, [dispatch, dialogueData]);
  const { articleCategory } = useSelector((state) => state.articleCategory);

  const onPreviewDrop = (files) => {
    setError({ ...error, images: '' });

    files.forEach((file, index) => {
      Object.assign(file, { preview: URL.createObjectURL(file) });
      setImages((prevImages) => prevImages.concat(file));
    });
  };

  const handleImage = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailPath(URL.createObjectURL(e.target.files[0]));
    setError((prevErrors) => ({
      ...prevErrors,
      thumbnail: '',
    }));
  };

  const removeImage = (file) => {
    if (file?.preview) {
      const image = images.filter((ele) => {
        return ele?.preview !== file?.preview;
      });
      setImages(image);
    }
  };

  const handleSubmit = (e) => {
    if (
      !content ||
      !imageCredit ||
      !categoryId ||
      (!url && !images) ||
      !imageType ||
      !thumbnail ||
      !thumbnailPath
    ) {
      let error = {};
      if (!title) error.title = 'title is required';
      if (!content) error.content = 'Content is required';
      if (!imageCredit) error.imageCredit = 'imageCredit is required';
      if (!categoryId) error.categoryId = 'category is required';
      if (!thumbnail) error.thumbnail = 'thumbnail is required';
      if (imageType == 1 && !url) error.url = 'Image Url or file is required';
      if (imageType == 2 && images.length == 0)
        error.images = 'Image Url or file is required';
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('articleCategoryId', categoryId._id);
      formData.append('content', content);
      formData.append('imageCredit', imageCredit);
      formData.append('imageType', imageType);
      formData.append('thumbnail', thumbnail);
      if (images.length !== 0) {
        for (let index = 0; index < images?.length; index++) {
          formData.append('image', images[index]);
        }
      } else {
        formData.append('url', url);
      }

      dispatch(articleAdd(formData));
    }
  };

  return (
    <>
      <div className="addArticle">
        <Title name={'Add Blog'} />
        <div className="mainAddArticle">
          <div className="loginButton m15-bottom">
            <Button
              type={`submit`}
              className={`bg-success text-white`}
              text={`Submit`}
              onClick={handleSubmit}
              style={{ borderRadius: '30px' }}
            />
          </div>
          <div className="row align-items-start formBody">
            <div className="col-12 col-md-6">
              <ExInput
                type={`text`}
                id={`title`}
                name={`title`}
                value={title}
                label={`Title`}
                placeholder={`title`}
                errorMessage={error.title && error.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      title: `title Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      title: '',
                    });
                  }
                }}
              />
            </div>

            <div className="col-12 col-md-6">
              <ExInput
                type={`text`}
                id={`imageCredit`}
                name={`imageCredit`}
                value={imageCredit}
                label={`imageCredit`}
                placeholder={`imageCredit`}
                errorMessage={error.imageCredit && error.imageCredit}
                onChange={(e) => {
                  setImageCredit(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      imageCredit: `imageCredit Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      imageCredit: '',
                    });
                  }
                }}
              />
            </div>

            <div className="col-12">
              <div className="inputData"></div>
              <Textarea
                id={`content`}
                name={`content`}
                value={content}
                rows={3}
                label={`content`}
                placeholder={`Content`}
                errorMessage={error.content && error.content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      content: `Content is required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      content: '',
                    });
                  }
                }}
              />
            </div>

            <div class="col-12 col-md-6">
              <div className="inputData">
                <label className=" " htmlFor="category">
                  Article Category
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
                        dialogueData ? dialogueData?.articleCategoryId?._id : ''
                      }
                      selected
                      disabled={dialogueData && true}
                    >
                      {dialogueData
                        ? dialogueData?.articleCategoryId?.name
                        : '--select Article category--'}
                    </option>
                    {articleCategory.map((data) => {
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

            <div className="col-6">
              <ExInput
                label={`Thumbnail`}
                id={`image`}
                type={`file`}
                onChange={(e) => handleImage(e)}
                errorMessage={error.thumbnail && error.thumbnail}
                accept={'image/*'}
              />
              <img
                src={thumbnailPath !== '' ? baseURL + thumbnailPath : null}
                alt=""
                draggable="false"
                className={`${
                  (!thumbnailPath || thumbnailPath === '') && 'mt-2 d-none'
                } `}
                data-class={`showImag `}
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            </div>

            <div className=" col-12 col-md-6 ">
              <div className="inputData">
                <label>Image Type</label>
                <div className="d-flex m15-top">
                  <div className="col-4 ms-2">
                    <ExInput
                      type={`radio`}
                      id={`male`}
                      label={`File`}
                      name={`gender`}
                      value={2}
                      checked={imageType == 2 && true}
                      onChange={(e) => {
                        setImageType(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            imageType: `image Type Is Required`,
                          });
                        } else {
                          return setError({
                            ...error,
                            imageType: '',
                          });
                        }
                      }}
                    />
                  </div>

                  <div className="col-4">
                    <ExInput
                      type={`radio`}
                      id={`female`}
                      label={`Url`}
                      name={`gender`}
                      value={1}
                      checked={imageType == 1 && true}
                      onChange={(e) => {
                        setImageType(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            imageType: `imageType is Required`,
                          });
                        } else {
                          return setError({
                            ...error,
                            imageType: '',
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 ">
              {imageType == 1 && (
                <div className="w-50">
                  <ExInput
                    type={`text`}
                    id={`url`}
                    name={`url`}
                    value={url}
                    label={`Image Url`}
                    placeholder={`url`}
                    errorMessage={error.url && error.url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          url: `url Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          url: '',
                        });
                      }
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              {imageType == 2 && (
                <>
                  <div className="col-12">
                    <div class="inputData text  flex-row justify-content-start text-start">
                      <label for="latitude" class="false ">
                        Select Multiple Image
                      </label>

                      <ReactDropzone
                        onDrop={(acceptedFiles) => onPreviewDrop(acceptedFiles)}
                        accept="image/*"
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <div
                                style={{
                                  height: 130,
                                  width: 130,
                                  border: '2px dashed gray',
                                  textAlign: 'center',
                                  marginTop: '10px',
                                }}
                              >
                                <i
                                  className="fas fa-plus"
                                  style={{ paddingTop: 30, fontSize: 70 }}
                                ></i>
                              </div>
                            </div>
                          </section>
                        )}
                      </ReactDropzone>
                      <div className="inputData">
                        <p className="errorMessage">
                          {error.images && error.images}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    {images?.length > 0 && (
                      <>
                        {images.map((file, index) => (
                          <div key={index}>
                            <img
                              alt="app"
                              src={
                                file.preview
                                  ? `${baseURL}${file.preview}`
                                  : `${baseURL}${file}`
                              }
                              style={{
                                height: '100px',
                                width: '100px',
                                boxShadow: '0 5px 15px 0 rgb(105 103 103 / 0%)',
                                border: '2px solid #fff',
                                borderRadius: 10,
                                float: 'left',
                                marginRight: 15,
                              }}
                            />
                            <div
                              className="img-container"
                              style={{
                                display: 'inline',
                                position: 'relative',
                                float: 'left',
                              }}
                            >
                              <i
                                className="fas fa-times-circle text-danger"
                                style={{
                                  position: 'absolute',
                                  right: '10px',
                                  top: '4px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => removeImage(file)}
                              ></i>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ArticleDialogDirect;
