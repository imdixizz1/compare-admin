import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import { useDispatch, useSelector } from 'react-redux';
import { editData, generateNum, objectToFormData, submitData } from '../../util/fuction';
import { categoryGet } from '../../../redux/slice/categorySlice';
import { attributesGet } from '../../../redux/slice/attributesSlice';
import Input, { Image, MultiSelect, Select } from '../../extra/Input';
import Button from '../../extra/Button';
import { productAdd } from '../../../redux/slice/productSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { closeDialog } from '../../../redux/slice/dialogSlice';

const ProductAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { dialogueData } = useSelector(
    (state) => state.dialogue
  );
  const { category } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(categoryGet())
  }, []);


  const { attributes } = useSelector(
    (state) => state.attributes
  );
  useEffect(() => {
    dispatch(attributesGet())
  }, []);

  console.log("location", location);
  const [arrayCount, setArrayCount] = useState(1);
  const [arrayCustomCount, setArrayCustomCount] = useState(arrayCount);

  useEffect(() => {
    if (location?.state) {
      editData(location?.state);
    }
  }, [location?.state]);



  const handleSubmit = async (e) => {
    const addProduct = submitData(e);
    console.log("addProduct", addProduct);

    // Update or New Index Value 
    const arrayNewCount = []
    const newTest = e.target.querySelectorAll("#mainMultiSelector")[0].children
    for (let i = 0; i < newTest.length; i++) {
      arrayNewCount.push(newTest[i].getAttribute("data-tabIndex"))
    }

    if (addProduct) {
      // multiple images array of [array object]
      const newImageArray = { profileImage: Array.from({ length: arrayNewCount.length }, (_, i) => addProduct[`images${arrayNewCount[i]}`]) }
      const newColorArray = { color: Array.from({ length: arrayNewCount.length }, (_, i) => addProduct[`color${arrayNewCount[i]}`]) }
      const newSizeArray = { size: Array.from({ length: arrayNewCount.length }, (_, i) => addProduct[`size${arrayNewCount[i]}`]) }
      const newStockArray = { stock: Array.from({ length: arrayNewCount.length }, (_, i) => addProduct[`stock${arrayNewCount[i]}`]) }

      const customObj = {
        title: addProduct.title,
        febric: addProduct.febric,
        categoryId: addProduct.categoryId,
        oldPrice: addProduct.oldPrice,
        price: addProduct.price,
        shippingCharge: addProduct.shippingCharge,
        productCode: addProduct.productCode,
        ...newImageArray,
        ...newColorArray,
        ...newSizeArray,
        ...newStockArray
      }


      console.log("customObj", customObj);

      const formData = objectToFormData(customObj);


      try {
        if (formData) {
          let response = await dispatch(productAdd(formData)).unwrap();
          console.log(response.status, "response.data.status");
          if (response.status) {
            dispatch(closeDialog())
            navigate(-1)
          } else {
            alert(response.message);
          }
        }
      } catch (err) {
        console.log("err", err);
        alert(err.message)
      }
    }

  };

  const option = category.map((res) => { return { name: res.categoryName, value: res._id } })

  const attributeNames = ["Color", "Size"];
  const [colorData, sizeData] = attributeNames.map(attrName =>
    attributes.find(obj => obj["attrName"] === attrName)
  );


  const handleRemoveInnerHTML = (index) => {
    // Remove the element at the specified index
    const element = document.querySelector(`[data-tabIndex="${index}"]`);
    console.log("element", element);
    if (element) {
      element.remove();
      setArrayCustomCount(arrayCustomCount - 1)
    }
  }





  return (
    <div>
      <Title name={"Add Product"} />

      <div className="mainAddProduct">

        <form onSubmit={handleSubmit} id="productForm" className='position-relative p10-x'>
          <div className="row align-items-start formBody" >
            <div className="col-lg-6 col-12">
              <Input
                type={`text`}
                id={`title`}
                name={`title`}
                label={`Title`}
                placeholder={`Title`}
                errorMessage={`Enter Title`}
              />
            </div>
            <div className="col-lg-6 col-12">
              <Input
                type={`text`}
                id={`febric`}
                name={`febric`}
                label={`Febric`}
                placeholder={`Febric`}
                errorMessage={`Enter Febric`}
              />
            </div>
            <div className="col-lg-4 col-6">
              <Input
                type={`number`}
                id={`oldPrice`}
                name={`oldPrice`}
                label={`Old Price`}
                placeholder={`Old Price`}
                errorMessage={`Enter Old Price`}
              />
            </div>
            <div className="col-lg-4 col-6">
              <Input
                type={`number`}
                id={`price`}
                name={`price`}
                label={`Price`}
                placeholder={`Price`}
                errorMessage={`Enter Old Price`}
              />
            </div>
            <div className="col-lg-4 col-12">
              <Input
                type={`number`}
                id={`shippingCharge`}
                name={`shippingCharge`}
                label={`Shipping  Charge`}
                placeholder={`Shipping  Charge`}
                errorMessage={`Enter Shipping  Charge`}
              />
            </div>
            <div className="col-lg-6 col-12">
              <Input
                type={`number`}
                id={`productCode`}
                name={`productCode`}
                label={`Product Code`}
                placeholder={`Product Code`}
                errorMessage={`Enter product Code`}
                validation={`^[a-zA-Z0-9]{8,8}$`}
                validationError={`Invalid Product Code`}
                activeIcon={`ri-information-line`}
                activClick={() => generateNum(8, "productCode")}
              />
            </div>
            <div className="col-lg-6 col-12">
              <Select
                option={option}
                className={`inputSelect`}
                id={`categoryId`}
                name={`categoryId`}
                label={`Category`}
                placeholder={`Select Category`}
                errorMessage={`Select Category`}
              />
            </div>

            <div className="col-12 mainMultiSelector" id='mainMultiSelector'>
              {
                Array(arrayCount).fill().map((res, index) => {

                  return (
                    <div className="row" data-tabIndex={index}>
                      {
                        arrayCustomCount > 1 && <div className="multiRemover" onClick={() => handleRemoveInnerHTML(index)}>
                          <i class="ri-delete-bin-5-line"></i>
                        </div>
                      }

                      <div className="col-md-4 col-8">
                        <Select
                          option={colorData?.details}
                          className={`inputSelect`}
                          id={`color${index}`}
                          name={`color${index}`}
                          label={`Color`}
                          placeholder={`Select Color`}
                          errorMessage={`Select Color`}
                        />
                      </div>
                      <div className="col-lg-2 col-4">
                        <Input
                          type={`number`}
                          id={`stock${index}`}
                          name={`stock${index}`}
                          label={`Stock`}
                          placeholder={`Stock`}
                          errorMessage={`Enter Stock`}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <MultiSelect
                          options={sizeData?.details}
                          className={`inputSelect`}
                          id={`size${index}`}
                          name={`size${index}`}
                          label={`Size`}
                          placeholder={`Select Size`}
                          errorMessage={`Select Size`}
                        />
                      </div>
                      <div className="col-12">
                        <Image
                          label={`Images`}
                          id={`images${index}`}
                          name={`images${index}`}
                          errorMessage={`Enter Images`}
                          multiple={true}
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="col-md-4 col-7 m-auto">
              <Button className={`bg-success text-light w-100`} text={`Add More Color`} type={`button`} onClick={() => {
                setArrayCount(arrayCount + 1)
                setArrayCustomCount(arrayCustomCount + 1)
              }} />
            </div>
          </div>
          <div className="row formFooter">
            <div className="col-6 text-center m0">
              <Button className={`bg-gray text-light w-100`} text={`Cancel`} type={`button`} />
            </div>
            <div className="col-6 text-center m0">
              <Button
                type={`submit`}
                className={`bg-second text-light w-100`}
                text={`Submit`}
              />
            </div>
          </div>
        </form>
      </div>
      {/* var script = document.createElement("script")
    script.scr = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script)
    script.onload = (() => eruda.init()) */}

      {/* javascript:(function%20()%20%7B%20var%20script%20=%20document.createElement('script');%20script.src=%22//cdn.jsdelivr.net/npm/eruda%22;%20document.body.appendChild(script);%20script.onload%20=%20function%20()%20%7B%20eruda.init()%20%7D%20%7D)(); */}
    </div>

  );
}

export default ProductAdd;
