import { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import { ExInput } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import { categoryGet } from '../../../redux/slice/articleCaegorySlice';
import ReactDropzone from 'react-dropzone';
import Button from '../../extra/Button';
import { articleAdd, articleUpdate } from '../../../redux/slice/articleSlice';
import { useLocation } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { baseURL } from '../../util/config';

const ArticleDialog = () => {
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

  useEffect(() => {
    if (dialogueData) {
      setContent(dialogueData?.content);
      setTitle(dialogueData?.title);
      setCategoryId(dialogueData?.articleCategoryId);
      setImageCredit(dialogueData?.imageCredit);
      setThumbnailPath(baseURL + dialogueData?.thumbnail);
      setThumbnail(dialogueData?.thumbnail);
      setImages(dialogueData.imageType == 2 ? dialogueData?.image : []);
      setUrl(dialogueData.imageType == 1 ? dialogueData?.image : '');
      setImageType(dialogueData?.imageType);
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

    files.forEach((file) => {
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
      const image = images.filter((ele) => ele?.preview !== file?.preview);
      setImages(image);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title ||
      !content ||
      !categoryId ||
      ( imageType == 1 && !url) ||
      (imageType == 2 && images.length == 0) ||
      !thumbnail ||
      !thumbnailPath
    ) {
      let error = {};
      if (!title) error.title = 'title is required';
      if (!content) error.content = 'Content is required';
      if (!categoryId) error.categoryId = 'category is required';
      if (!thumbnail) error.thumbnail = 'thumbnail is required';
      if (imageType == 1 && !url) error.url = 'Image Url is required';
      if (imageType == 2 && images.length == 0)
        error.images = 'Image file is required';
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append('title', title);
      if(dialogueData){
        formData.append('articleCategoryId', categoryId._id);

      }else{

        formData.append('articleCategoryId', categoryId);
      }
      formData.append('content', content);
      formData.append('imageCredit', imageCredit);
      formData.append('imageType', imageType);
      formData.append('thumbnail', thumbnail);
      if (imageType == 2 && images.length !== 0) {
        for (let index = 0; index < images?.length; index++) {
          formData.append('image', images[index]);
        }
      } else {
        formData.append('image', url);
      }
      if (dialogueData) {
        let data = {
          data: formData,
          id: dialogueData._id,
        };
        dispatch(articleUpdate(data));
      } else {
        dispatch(articleAdd(formData));
      }
    }
  };

  return (
    <>
      <div className="addArticle">
        <Title name={dialogueData ? ` Edit Blog` : 'Add Blog'} />
        <div className="mainAddArticle">
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
              <div className="inputData">
                <label className=" " htmlFor="category">
                  Category
                </label>
                <div>
                  <select
                    disabled={dialogueData && true}
                    name="category"
                    className="rounded-2 "
                    id="category"
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          categoryId: 'Category is Required !',
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
                    >
                      {dialogueData
                        ? dialogueData?.articleCategoryId?.name
                        : '-- Select Category --'}
                    </option>
                    {articleCategory.map((data) => (
                      <option key={data._id} value={data._id}>
                        {data?.name}
                      </option>
                    ))}
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

            <div className='my-2 mx-auto' style={{backgroundColor:"black",height:"1px",opacity:"0.2",width:"98%"}}></div>

            <div className="col-12">
              <div className="inputData"></div>
              <div>
                <JoditEditor
                  value={content}
                  tabIndex={1}
                  onChange={(newContent) => setContent(newContent)}
                />
              </div>
            </div>

            <div className='my-2 mx-auto' style={{backgroundColor:"black",height:"1px",opacity:"0.2",width:"98%"}}></div>




            <div className="col-6 col-md-12">
              <ExInput
                label={`Thumbnail`}
                id={`image`}
                type={`file`}
                onChange={(e) => handleImage(e)}
                errorMessage={error.thumbnail && error.thumbnail}
                accept={'image/*'}
              />
              <img
                src={thumbnailPath !== '' ? thumbnailPath : null}
                alt=""
                draggable="false"
                className={`${
                  (!thumbnailPath || thumbnailPath === '') && 'mt-2 d-none'
                } `}
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            </div>

            <div className='my-2 mx-auto' style={{backgroundColor:"black",height:"1px",opacity:"0.2",width:"98%"}}></div>


            <div className=" col-12 col-md-6 ">
              <div className="inputData">
                <label>Image Type</label>
                <div className="d-flex m15-top">
                  <div className="col-4 ms-2">
                    <ExInput
                      type={`radio`}
                      id={`file`}
                      label={`File`}
                      name={`imageType`}
                      value={2}
                      checked={imageType === 2}
                      onChange={(e) => {
                        setImageType(Number(e.target.value));
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
                      id={`url`}
                      label={`Url`}
                      name={`imageType`}
                      value={1}
                      checked={imageType === 1}
                      onChange={(e) => {
                        setImageType(Number(e.target.value));
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

            {imageType === 1 && (
              <div className="col-12 col-md-6">
                <ExInput
                  type={`text`}
                  id={`url`}
                  name={`url`}
                  value={url}
                  label={`Cover image Url`}
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

            {imageType === 2 && (
              <div className="col-12">
                <div className="inputData text  flex-row justify-content-start text-start">
                  <label className="false">Select Cover Image</label>
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
                  {error.images && (
                    <div className="inputData">
                      <p className="errorMessage">{error.images}</p>
                    </div>
                  )}
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
                                ? `${file.preview}`
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
              </div>
            )}

<div className='my-2 mx-auto' style={{backgroundColor:"black",height:"1px",opacity:"0.2",width:"98%"}}></div>


<div className="col-12 col-md-6">
              <ExInput
                type={`text`}
                id={`imageCredit`}
                name={`imageCredit`}
                value={imageCredit}
                label={`Image Credit (optional)`}
                placeholder={`image credit`}
                onChange={(e) => {
                  setImageCredit(e.target.value);
                 
                }}
              />
            </div>


            <div className="loginButton m15-top mb-2">
              <Button
                type={`submit`}
                className={`bg-success text-white`}
                text={`Submit`}
                onClick={handleSubmit}
                style={{ borderRadius: '30px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDialog;
