/* eslint-disable no-lone-blocks */
import { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import { ExInput, Textarea } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import { categoryGet } from '../../../redux/slice/categorySlice';
import ReactDropzone from 'react-dropzone';
import Button from '../../extra/Button';
import { articleAdd, articleUpdate } from '../../../redux/slice/articleSlice';
import { useLocation } from 'react-router-dom';
import {
  editProductDetail,
  productAdd,
  productGetById,
} from '../../../redux/slice/productSlice';
import { categoryWise } from '../../../redux/slice/subCategorySlice';
import Multiselect from 'multiselect-react-dropdown';
import {
  getFeatureWise,
  subFeatureGet,
} from '../../../redux/slice/subFeatureSlice';
import {
  featureGet,
  featureSubCategoryWiseGet,
} from '../../../redux/slice/featureSlice';

const ProductDialog = () => {
  const [title, setTitle] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [description, setDescription] = useState('');
  const [imageType, setImageType] = useState(1);
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [featureId, setFeatureId] = useState([]);
  const [subFeatureId, setSubFeatureId] = useState([]);
  const [price, setPrice] = useState('');
  const [productCompany, setProductCompany] = useState('');
  const [score, setScore] = useState();
  const [details, setDetails] = useState();
  const [subData, setSubData] = useState([]);
  const [allFeature, setAllFeature] = useState([]);
  const [allSubFeature, setAllSubFeature] = useState([]);
  const { productDetails } = useSelector((state) => state.product);
  const { state } = useLocation();

  useEffect(() => {
    const payload = state?.id;
    console.log('payload', payload);
    if (payload !== null) {
      setDetails(productDetails);
    }
  }, [productDetails, state]);
  const [error, setError] = useState({
    title: '',
    reviewTitle: '',
    affiliateLink: '',
    description: '',
    subCategoryId: '',
    featureId: '',
    subFeatureId: '',
    price: '',
    productCompany: '',
    imageType: '',
    images: '',
    categoryId: '',
    thumbnail: '',
    content: '',
    url: '',
    score: '',
    allSubFeature: '',
  });

  useEffect(() => {
    if (details) {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');
      setTitle(details?.title);
      setReviewTitle(details?.productReviewTitle);
      setAffiliateLink(details?.affiliateLink);
      setDescription(details?.description);
      setImageType(details?.imageType);
      setImages(details.imageType == 2 ? details?.image : []);
      setUrl(details.imageType == 1 ? details?.image : '');
      setThumbnailPath(details?.thumbnail);
      setThumbnail(details?.thumbnail);
      setCategoryId(details?.categoryId);
      setSubCategoryId(details?.subCategoryId);
      setFeatureId(details?.featureData);
      setSubFeatureId(details?.subfeatureData);
      setPrice(details?.price);
      setScore(details?.scoreValue);
      setProductCompany(details?.productCompany);
      setAllFeature(details.featureData);
      setAllSubFeature(details.subfeatureData);
    }
  }, [details]);

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = state?.id;

    if (payload !== undefined && payload !== null) {
      dispatch(productGetById(payload));
    }
  }, [dispatch, state]);

  useEffect(() => {
    const data = {
      start: 1,
      limit: 50,
    };
    dispatch(categoryGet(data));
  }, [dispatch]);

  useEffect(() => {
    const featureIds = allFeature
      ?.map((feature) => feature?.featureId)
      .join(',');
    if (featureIds?.length > 0) {
      dispatch(getFeatureWise(featureIds));
    }
  }, [dispatch, allFeature]);

  useEffect(() => {
    if (subCategoryId?.length > 0) {
      dispatch(featureSubCategoryWiseGet(subCategoryId));
    }
  }, [dispatch, subCategoryId]);

  const { category } = useSelector((state) => state.category);
  const { subCategory } = useSelector((state) => state.subCategory);
  const { subFeature } = useSelector((state) => state.subFeature);
  const { feature } = useSelector((state) => state.feature);

  useEffect(() => {
    const addData = productDetails?.featureId?.map((item) => {
      const { _id, ...rest } = item;
      return { id: _id, ...rest };
    });
    setAllFeature(addData);
  }, [productDetails]);

  const featureList = feature?.map((list) => ({
    name: list?.featureName,
    id: list?._id,
  }));

  const subFeatureList = subFeature?.map((list) => ({
    name: list?.name,
    id: list?._id,
  }));

  const selectedFeatureNames = state
    ? productDetails?.featureData?.map((selectedId) => {
        const matchingService = featureId?.find(
          (service) => service?._id === selectedId?._id
        );
        return {
          id: matchingService?.subfeatureId,
          name: matchingService?.featureName,
        };
      })
    : [];

  const selectedSubFeatureNames = state
    ? productDetails?.subfeatureData?.map((selectedId) => {
        const matchingService = subFeatureId?.find(
          (service) => service?._id === selectedId?._id
        );
        return { id: matchingService?._id, name: matchingService?.name };
      })
    : [];

  function onSelect(selectedList, selectedItem) {
    const updatedFeatures =
      allFeature !== undefined ? [...allFeature, selectedItem] : [selectedItem];
    setAllFeature(updatedFeatures);
  }

  function onSelectSubFeature(selectedList, selectedItem) {
    const updatedFeatures =
      allSubFeature !== undefined
        ? [...allSubFeature, selectedItem]
        : [selectedItem];
    setAllSubFeature(updatedFeatures);
  }
  function onRemove(selectedList, removedItem) {
    const updatedFeatures = selectedList?.filter(
      (item) => item.id !== removedItem.id
    );
    setAllFeature(updatedFeatures);
  }

  function onRemoveSubFeature(selectedList, removedItem) {
    const updatedFeatures = selectedList?.filter(
      (item) => item.id !== removedItem.id
    );
    setAllSubFeature(updatedFeatures);
  }

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

  useEffect(() => {
    if (categoryId) {
      setSubData(subCategory);
    }
  }, [categoryId, subCategory]);

  useEffect(() => {
    if (categoryId?.length > 0) {
      dispatch(categoryWise(categoryId));
    }
  }, [categoryId, dispatch]);

  const handleSubmit = (e) => {
    debugger;
    if (
      !title ||
      !affiliateLink ||
      !reviewTitle ||
      !description ||
      !imageType ||
      (!url && !images) ||
      !thumbnail ||
      !thumbnailPath ||
      !categoryId ||
      !subCategoryId ||
      !allFeature ||
      !allSubFeature ||
      !price ||
      !score
    ) {
      let error = {};
      if (!title) error.title = 'title is required';
      if (!reviewTitle) error.reviewTitle = 'reviewTitle is required';
      if (!affiliateLink) error.affiliateLink = 'affiliateLink is required';
      if (!description) error.description = 'description is required';
      if (imageType == 2 && images.length == 0)
        error.images = 'Image Url or file is required';
      if (imageType == 1 && !url) error.url = 'Image Url or file is required';
      if (!thumbnail) error.thumbnail = 'thumbnail is required';
      if (!categoryId) error.categoryId = 'category is required';
      if (!subCategoryId) error.subCategoryId = 'subCategory is required';
      if (!allFeature) error.allFeature = 'feature is required';
      if (!allSubFeature) error.allSubFeature = 'subFeature is required';
      if (!price) error.price = 'price is required';
      if (!score) error.score = 'score is required';

      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('productReviewTitle', reviewTitle);
      formData.append('affiliateLink', affiliateLink);
      formData.append('description', description);
      if (images.length !== 0) {
        for (let index = 0; index < images?.length; index++) {
          formData.append('image', images[index]);
        }
      } else {
        formData.append('image', url);
      }
      formData.append('imageType', imageType);
      formData.append('thumbnail', thumbnail);
      if (details) {
        formData.append('categoryId', categoryId._id);
        formData.append('subCategoryId', subCategoryId._id);
      } else {
        formData.append('categoryId', categoryId);
        formData.append('subCategoryId', subCategoryId);
      }
      formData.append('price', price);
      formData.append('scoreValue', score);
      formData.append('productCompany', productCompany);
      const featureData = allFeature.map(({ name, ...rest }) => rest);
      const featureJSON = JSON.stringify(featureData);
      formData.append('featureData', featureJSON);
      const subFeatureData = allSubFeature.map(({ name, ...rest }) => rest);
      const subFeatureJSON = JSON.stringify(subFeatureData);
      formData.append('subfeatureData', subFeatureJSON);
      debugger;
      if (details) {
        debugger;
        let productData = {
          data: formData,
          id: details._id,
        };
        dispatch(editProductDetail(productData));
      } else {
        dispatch(productAdd(formData));
      }
    }
  };

  const handleSubFeatureScoreChange = (e, index) => {
    const { value } = e.target;
    const updatedSubFeatures = [...allSubFeature];
    updatedSubFeatures[index].scoreValue = parseInt(value);
    setAllSubFeature(updatedSubFeatures);
  };

  const handleSubFeatureUnitChange = (e, index) => {
    const { value } = e.target;
    const updatedSubFeatures = [...allSubFeature];
    updatedSubFeatures[index].unit = value;
    setAllSubFeature(updatedSubFeatures);
  };
  const handleSubFeatureTypeChange = (e, index) => {
    const { value } = e.target;
    const updatedSubFeatures = [...allSubFeature];
    updatedSubFeatures[index].type = parseInt(value);
    setAllSubFeature(updatedSubFeatures);
  };

  const handleSubFeatureIsTrueChange = (e, index) => {
    const { value } = e.target;
    console.log('value---', value);
    const updatedSubFeatures = [...allSubFeature];
    updatedSubFeatures[index].isTrueFalse = value?.toString();

    setAllSubFeature(updatedSubFeatures);
  };

  const trueFalse = [
    {
      value: 'true',
    },
    {
      value: 'false',
    },
  ];

  console.log('AllSubFeature', allSubFeature);

  return (
    <>
      <div className="addArticle">
        <Title name={state ? ` Edit Product` : 'Add Product'} />
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
              <ExInput
                type={`text`}
                id={`affiliateLink`}
                name={`affiliateLink`}
                value={affiliateLink}
                label={`affiliate link`}
                placeholder={`affiliateLink`}
                errorMessage={error.affiliateLink && error.affiliateLink}
                onChange={(e) => {
                  setAffiliateLink(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      affiliateLink: `affiliateLink Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      affiliateLink: '',
                    });
                  }
                }}
              />
            </div>

            <div className="col-12">
              <div className="inputData"></div>
              <Textarea
                id={`content`}
                name={`reviewTitle`}
                value={reviewTitle}
                rows={3}
                label={`review title`}
                placeholder={`Product review Title`}
                errorMessage={error.reviewTitle && error.reviewTitle}
                onChange={(e) => {
                  setReviewTitle(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      reviewTitle: `reviewTitle is required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      reviewTitle: '',
                    });
                  }
                }}
              />
            </div>

            <div className="col-12">
              <div className="inputData"></div>
              <Textarea
                id={`content`}
                name={`description`}
                value={description}
                rows={3}
                label={`description`}
                placeholder={`Product description`}
                errorMessage={error.description && error.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      description: `description is required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      description: '',
                    });
                  }
                }}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ExInput
                type={`number`}
                id={`score`}
                name={`score`}
                value={score}
                label={`score`}
                placeholder={`score`}
                errorMessage={error.score && error.score}
                onChange={(e) => {
                  setScore(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      score: ` score Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      score: '',
                    });
                  }
                }}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ExInput
                type={`number`}
                id={`price`}
                name={`price`}
                value={price}
                label={`price`}
                placeholder={`price`}
                errorMessage={error.price && error.price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      price: ` price Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      price: '',
                    });
                  }
                }}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ExInput
                type={`text`}
                id={`productCompany`}
                name={`productCompany`}
                value={productCompany}
                label={`Product Company`}
                placeholder={`Product Company`}
                errorMessage={error.productCompany && error.productCompany}
                onChange={(e) => {
                  setProductCompany(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      productCompany: `Product company Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      productCompany: '',
                    });
                  }
                }}
              />
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
                src={thumbnailPath !== '' ? thumbnailPath : null}
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
                      id={`imagetype`}
                      label={`File`}
                      name={`imagetype`}
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
                        {images?.map((file, index) => {
                          return (
                            <>
                              <img
                                alt="app"
                                src={file.preview ? file.preview : file}
                                style={{
                                  height: '100px',
                                  width: '100px',
                                  boxShadow:
                                    '0 5px 15px 0 rgb(105 103 103 / 00%)',
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
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>
                </>
              )}
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
                    <option value={state ? details?.categoryId?._id : ''}>
                      {state
                        ? details?.categoryId?.name
                        : '--Select Category--'}
                    </option>
                    {category.map((data) => {
                      return (
                        <option value={data._id} className="text-capitalize">
                          {data?.name}
                        </option>
                      );
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
                    value={subCategoryId}
                    onChange={(e) => {
                      setSubCategoryId(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          subCategoryId: 'subCategoryId is Required !',
                        });
                      } else {
                        setError({
                          ...error,
                          subCategoryId: '',
                        });
                      }
                    }}
                  >
                    <option value={state ? details?.subCategoryId?._id : ''}>
                      {state
                        ? details?.subCategoryId?.name
                        : '--Select Subcategory--'}
                    </option>
                    {subData.map((data) => {
                      return (
                        <option value={data._id} className="text-capitalize">
                          {' '}
                          {data?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {error?.subCategoryId && (
                <div className="inputData">
                  <p className="errorMessage text-start text-capitalize">
                    {error && error?.subCategoryId}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 mainMultiSelector row align-items-start formBody">
            <div className="col-12 ">
              <label for="fname" class="false text-capitalize">
                Select Features
              </label>
              <div>
                <Multiselect
                  options={featureList}
                  selectedValues={
                    selectedFeatureNames ? selectedFeatureNames : []
                  }
                  onSelect={(selectedList, selectedItem) => {
                    const updatedFeatures =
                      allFeature !== undefined
                        ? [
                            ...allFeature,
                            {
                              featureId: selectedItem.id,
                              scoreValue: selectedItem.scoreValue,
                              name: selectedItem.name,
                            }, // Include scoreValue here
                          ]
                        : [
                            {
                              featureId: selectedItem.id,
                              scoreValue: selectedItem.scoreValue,
                            },
                          ]; // Include scoreValue here
                    setAllFeature(updatedFeatures);
                  }}
                  onRemove={(selectedList, removedItem) => {
                    const updatedFeatures = selectedList?.filter(
                      (item) => item.id !== removedItem.id
                    );
                    setAllFeature(updatedFeatures);
                  }}
                  displayValue="name"
                  className="cursor-pointer text-capitalize"
                />
              </div>

              {error.allService && (
                <p className="errorMessage">{error?.allService}</p>
              )}

              <div className="row align-items-start formBody">
                {state
                  ? ''
                  : allFeature?.map((feature, index) => (
                      <div key={index} className="col-12 col-md-4 col-lg-4 ">
                        <ExInput
                          type="number"
                          value={feature.scoreValue}
                          label={`Score for ${feature.name}`}
                          onChange={(e) => {
                            const updatedFeatures = [...allFeature];
                            updatedFeatures[index].scoreValue = e.target.value;
                            setAllFeature(updatedFeatures);
                          }}
                        />
                      </div>
                    ))}
              </div>
            </div>
            <div className="col-12">
              <label for="fname" class="false text-capitalize">
                Select Subfeatures
              </label>
              <Multiselect
                options={subFeatureList}
                selectedValues={
                  selectedSubFeatureNames ? selectedSubFeatureNames : []
                }
                onSelect={(selectedList, selectedItem) => {
                  const updatedSubFeatures =
                    allSubFeature !== undefined
                      ? [
                          ...allSubFeature,
                          {
                            subfeatureId: selectedItem.id,
                            description: selectedItem.description,
                            details: selectedItem.details,
                            type: selectedItem.type,
                            name: selectedItem.name,
                          }, // Include additional fields here
                        ]
                      : [
                          {
                            subfeatureId: selectedItem.id,
                            description: selectedItem.description,
                            details: selectedItem.details,
                            type: selectedItem.type,
                          },
                        ]; // Include additional fields here
                  setAllSubFeature(updatedSubFeatures);
                }}
                onRemove={(selectedList, removedItem) => {
                  const updatedSubFeatures = selectedList?.filter(
                    (item) => item.id !== removedItem.id
                  );
                  setAllSubFeature(updatedSubFeatures);
                }}
                displayValue="name"
                className="cursor-pointer text-capitalize"
              />
              {error.allSubFeature && (
                <p className="errorMessage">{error?.allSubFeature}</p>
              )}
              <div className="mt-3">
                {allSubFeature?.map((subFeature, index) => (
                  <div key={index} className="row col-12 ">
                    <div className="col-6 col-md-2">
                      <ExInput
                        type="text"
                        value={subFeature.details}
                        label={`Detail for ${subFeature.name}`}
                        className="pe-2"
                        onChange={(e) => {
                          const updatedSubFeatures = [...allSubFeature];
                          updatedSubFeatures[index].details = e.target.value;
                          setAllSubFeature(updatedSubFeatures);
                        }}
                      />
                    </div>
                    <div className="col-6 col-md-3">
                      <ExInput
                        type="text"
                        className="pe-2"
                        value={subFeature.description}
                        label={`Description for ${subFeature.name}`}
                        onChange={(e) => {
                          const updatedSubFeatures = [...allSubFeature];
                          updatedSubFeatures[index].description =
                            e.target.value;
                          setAllSubFeature(updatedSubFeatures);
                        }}
                      />
                    </div>

                    <div className="inputData col-6 col-md-2">
                      <label>Subfeature Type</label>
                      <div className="d-flex m15-top">
                        <div className="">
                          <ExInput
                            type={`radio`}
                            id={`subFeatureTypeFile${index}`}
                            label={`Score`}
                            name={`subFeatureType${index}`}
                            value={1}
                            checked={subFeature.type === 1}
                            onChange={(e) =>
                              handleSubFeatureTypeChange(e, index)
                            }
                          />
                        </div>
                        <div className="">
                          <ExInput
                            type={`radio`}
                            id={`subFeatureTypeUrl${index}`}
                            label={`True/false`}
                            name={`subFeatureType${index}`}
                            value={2}
                            checked={subFeature.type === 2}
                            onChange={(e) =>
                              handleSubFeatureTypeChange(e, index)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Conditional rendering based on subFeature type */}
                    {subFeature.type === 1 && (
                      <>
                        <div className="col-6 col-md-2">
                          <ExInput
                            type="number"
                            value={subFeature.scoreValue}
                            label={`Score for ${subFeature.name}`}
                            onChange={(e) =>
                              handleSubFeatureScoreChange(e, index)
                            }
                          />
                        </div>
                        <div className="col-6 col-md-2">
                          <ExInput
                            type="text"
                            value={subFeature.unit}
                            label={`Unit for ${subFeature.name}`}
                            onChange={(e) =>
                              handleSubFeatureUnitChange(e, index)
                            }
                          />
                        </div>
                      </>
                    )}

                    {subFeature.type === 2 && (
                      <div className="col-6 col-md-4">
                        <div className="inputData">
                          <label className="" htmlFor="category">
                            Select True/False
                          </label>
                          <div>
                            <select
                              name="category"
                              className="rounded-2 "
                              id="category"
                              value={subFeature.isTrueFalse}
                              onChange={(e) =>
                                handleSubFeatureIsTrueChange(e, index)
                              }
                            >
                              <option value={''}>--Select True false--</option>
                              {trueFalse.map((data, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={data.value}
                                    className="text-capitalize"
                                  >
                                    {data?.value}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    
                  </div>
                ))}
              </div>
              
            </div>
          </div>
          <div className="loginButton m15-bottom">
            <Button
              type={`submit`}
              className={`bg-success text-white mb-4`}
              text={`Submit`}
              onClick={handleSubmit}
              style={{ borderRadius: '30px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDialog;
