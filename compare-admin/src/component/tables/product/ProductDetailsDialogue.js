import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CLOSE_DIALOGUE } from "../../store/dialogue/dialogue.type";
import Input, { MultiSelect, Select, Textarea, Image } from "../../extra/Input";
import Button from "../../extra/Button";
import { useForm } from "react-hook-form";
import { editData, generateNum, objectToFormData, submitData } from "../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogSlice";
import { editProductDetail, productAdd } from "../../../redux/slice/productSlice";
import { categoryGet } from "../../../redux/slice/categorySlice";
import $ from "jquery"
import { attributesGet } from "../../../redux/slice/attributesSlice";

const ProductDetailsDialogue = ({ data, setData }) => {

  const { dialogueData } = useSelector(
    (state) => state.dialogue
  );
  const { category } = useSelector(
    (state) => state.category
  );
  const { attributes } = useSelector(
    (state) => state.attributes
  );

  const [arrayCount, setArrayCount] = useState(1);

  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
    }
  }, [dialogueData]);
  useEffect(() => {
    dispatch(categoryGet())
  }, []);
  useEffect(() => {
    dispatch(attributesGet())
  }, []);


  const handleSubmit = async (e) => {
    const addProduct = submitData(e);
    console.log("addProduct", addProduct);



    if (addProduct) {
      // multiple images array of [array object]
      // const newImageArray = { profileImage: Array.from({ length: arrayCount }, (_, i) => addProduct[`images${i}`]) }
      // const newColorArray = { color: Array.from({ length: arrayCount }, (_, i) => addProduct[`color${i}`]) }
      // const newSizeArray = { size: Array.from({ length: arrayCount }, (_, i) => addProduct[`size${i}`]) }


      // // console.log("newArray", newArray);
      // const otherFormData = { ...addProduct, ...newImageArray, ...newColorArray, ...newSizeArray };
      // console.log("otherFormData", otherFormData);

      // const formData = objectToFormData(otherFormData);


      try {
        let response
        response = await dispatch(editProductDetail(addProduct)).unwrap();
        console.log(response.status, "response.data.status");
        response.status ? dispatch(closeDialog()) : alert(response.message);
      } catch (err) {
        console.log("err", err);
        alert(err.message)
      }
    }

  };

  const option = category.map((res) => { return { name: res.categoryName, value: res._id } })

  // const attributeNames = ["Color", "Size"];
  // const [colorData, sizeData] = attributeNames.map(attrName =>
  //   attributes.find(obj => obj["attrName"] === attrName)
  // );


  const dispatch = useDispatch();
  return (
    <div className="dialog">

      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-11 m0">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-second m0">Product Dialog</h2>
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
              <form onSubmit={handleSubmit} id="productForm">
                <div className="row align-items-start formBody" style={{ maxHeight: "660px" }}>
                  <div className="col-lg-8 col-12">
                    <Input
                      type={`text`}
                      id={`title`}
                      name={`title`}
                      label={`Title`}
                      placeholder={`Title`}
                      errorMessage={`Enter Title`}
                    />
                  </div>
                  <div className="col-lg-4 col-12">
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
                      readOnly
                    />
                    {/* <span><i class="ri-information-line"></i></span> */}
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
                </div>
                <div className="row m20-top formFooter">
                  <div className="col-12 text-end m0">
                    <Button className={`bg-gray text-light`} text={`Cancel`} type={`button`} onClick={() => dispatch(closeDialog())} />
                    <Button
                      type={`submit`}
                      className={`bg-second text-light m10-left`}
                      text={`Submit`}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsDialogue;
