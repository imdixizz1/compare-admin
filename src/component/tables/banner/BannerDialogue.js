import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CLOSE_DIALOGUE } from "../../store/dialogue/dialogue.type";
import Input, { Image, Select, Textarea } from "../../extra/Input";
import Button from "../../extra/Button";
import { useForm } from "react-hook-form";
import { editData, objectToFormData, submitData } from "../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogSlice";
import { bannerAdd, bannerUpdate } from "../../../redux/slice/bannerSlice";

const BannerDialogue = ({ data, setData }) => {

  const { dialogueData } = useSelector(
    (state) => state.dialogue
  );

  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
    }
  }, [dialogueData]);


  const handleSubmit = async (e) => {
    const addBanner = submitData(e);
    if (addBanner) {

      console.log("addBanner", addBanner);
      const formData = objectToFormData(addBanner);

      try {
        let response
        if (dialogueData) {
          const payload = { formData, bannerId: dialogueData._id }
          response = await dispatch(bannerUpdate(payload)).unwrap();
        } else {
          response = await dispatch(bannerAdd(formData)).unwrap();
        }
        console.log(response.status, "response.data.status");
        response.status ? dispatch(closeDialog()) : alert(response.message);
      } catch (err) {
        console.log("err", err);
        alert(err.message)
      }
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
                  <h2 className="text-second m0">Banner Dialog</h2>
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
              <form onSubmit={handleSubmit} id="bannerForm">
                <div className="row align-items-start formBody">
                  <div className="col-12">
                    <Input
                      type={`text`}
                      id={`url`}
                      name={`url`}
                      label={`URL`}
                      placeholder={`URL`}
                      errorMessage={`Enter URL`}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      type={`file`}
                      id={`image`}
                      name={`image`}
                      label={`Image`}
                      errorMessage={`Enter Image`}
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

export default BannerDialogue;
