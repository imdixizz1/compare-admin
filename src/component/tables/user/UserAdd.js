import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CLOSE_DIALOGUE } from "../../store/dialogue/dialogue.type";
import Input, { Image,Select, Textarea } from "../../extra/Input";
import Button from "../../extra/Button";
import { useForm } from "react-hook-form";
import { editData, submitData } from "../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogSlice";

const UserAdd = ({ data, setData }) => {

  const { dialogueData } = useSelector(
    (state) => state.dialogue
  );

  const option = ["India", "pakistan", "Bangladsh", "chiana", "Khalistan"];

  const editDatas = {
    firstName: "cdc",
    lastName: "kathrotiya",
    number: 20,
    radio: "",
    selectCounty: "india",
    address: "dhkjd kjndkj",
    condition: true,
    ftls: true,
    email: "dkejb@jxd.com",
    images:
      ["https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg", "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"],
    MyImage:
      ["https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg", "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"],
    photos:
      "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
  };
  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
    }
  }, [dialogueData]);


  const handleSubmit = (e) => {
    const newData = submitData(e);
    console.log("newData", newData);
    if (newData) {
      setData((old) => {
        return [newData, ...old];
      });
      dispatch(closeDialog())
    }


  };

  const dispatch = useDispatch();
  return (
    <div className="dialog">

      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-8 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-second m0">User Dialog</h2>
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
              <form onSubmit={handleSubmit} id="userForm">
                <div className="row align-items-start formBody">
                  <div className="col-6">
                    <Input
                      type={`text`}
                      id={`firstName`}
                      label={`First Name`}
                      placeholder={`First Name`}
                      name={`firstName`}
                      errorMessage={`Enter First Name`}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      type={`text`}
                      id={`lastName`}
                      label={`Last Name`}
                      placeholder={`Last Name`}
                      name={`lastName`}
                      errorMessage={`Enter Last Name`}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      type={`number`}
                      id={`Count`}
                      label={`Count`}
                      placeholder={`number`}
                      name={`number`}
                      errorMessage={`Enter Number`}
                      validation={`1[89]$|^[2-9][0-9]+$`}
                      validationError={`Valid Only 18+`}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      type={`text`}
                      id={`email`}
                      label={`Email`}
                      placeholder={`Email`}
                      name={`email`}
                      errorMessage={`Enter Email`}
                      validation={`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`}
                      validationError={`Enter Valid Email`}
                    />
                  </div>
                  <div className="col-6">
                    <Select
                      option={option}
                      label={`Country`}
                      className={`inputSelect`}
                      id={`country`}
                      placeholder={`Select Country`}
                      name={`selectCounty`}
                      errorMessage={`Select Country`}
                    />
                  </div>
                  <div className="col-3">
                    <Input
                      type={`radio`}
                      id={`male`}
                      label={`Male`}
                      name={`radio`}
                      value={`male`}
                    />
                  </div>
                  <div className="col-3">
                    <Input
                      type={`radio`}
                      id={`female`}
                      label={`Female`}
                      name={`radio`}
                      value={`female`}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      type={`file`}
                      id={`Photos`}
                      label={`Photos`}
                      name={`photos`}
                      errorMessage={`Enter Photos`}
                    />
                  </div>
                  <div className="col-12">
                    <Textarea
                      id={`address`}
                      name={`address`}
                      label={`Address`}
                      row={3}
                      errorMessage={`Enter Address`}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      type={`checkbox`}
                      id={`cricket`}
                      label={`My billing and shipping address are the same`}
                      name={`condition`}
                      value={true}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      type={`checkbox`}
                      id={`football`}
                      label={`My billing and shipping address are the same`}
                      name={`ftls`}
                      value={true}
                    />
                  </div>
                  <div className="col-6">
                    <Image
                      label={`Images`}
                      id={`images`}
                      name={`images`}
                      errorMessage={`Enter Images`}
                      multiple={true}
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

export default UserAdd;
