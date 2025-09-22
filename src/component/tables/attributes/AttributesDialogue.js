import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../extra/Input";
import Button from "../../extra/Button";
import { editData, submitData } from "../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogSlice";
import { attributesUpdate } from "../../../redux/slice/attributesSlice";
import $ from "jquery"

const AttributesDialogue = ({ data, setData }) => {

  const { dialogueData } = useSelector(
    (state) => state.dialogue
  );

  const [details, setDetails] = useState([]);
  const [attrName, setAttrName] = useState("");

  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
      setDetails(dialogueData?.details)
      setAttrName(dialogueData?.attrName)
    }
  }, [dialogueData]);


  const handleSubmit = async (e) => {
    const addAttributes = submitData(e);
    if (addAttributes) {

      console.log("addAttributes", addAttributes);

      try {
        let response
        if (dialogueData) {
          const payload = { addAttributes: { details: details }, attributesId: dialogueData._id }
          response = await dispatch(attributesUpdate(payload)).unwrap();
        }
        console.log(response.status, "response.data.status");
        response.status ? dispatch(closeDialog()) : alert(response.message);
      } catch (err) {
        console.log("err", err);
        alert(err.message)
      }
    }
  };

  const addDetails = () => {
    const newValue = $("#attrForm #addDetails")[0].value
    console.log("newValue", newValue);
    setDetails((old) => {
      console.log("old", old);
      return (
        [...old, newValue]
      )
    })
  }

  const removeDetails = (id) => {
    setDetails((old) => {
      return old.filter((v, removeId) => {
        return removeId !== id

      })
    })
  }

  const dispatch = useDispatch();
  return (
    <div className="dialog">

      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-8 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-second m0">Attributes Dialog</h2>
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
              <form onSubmit={handleSubmit} id="attrForm">
                <div className="row align-items-start formBody align-items-center">
                  <div className="col-10 p0-right">
                    <Input
                      type={dialogueData?.attrName == "Color" ? "color" : "text"}
                      id={`addDetails`}
                      name={`addDetails`}
                      label={`Details`}
                      placeholder={`Details`}
                      errorMessage={`Enter Details`}
                      ignore={true}
                      defaultValue={`${dialogueData?.attrName == "Color" ? "#ebebeb" : ""}`}
                      className={`${dialogueData?.attrName == "Color" && "m18-top"}`}
                    />
                  </div>
                  <div className="col-2 m0 text-end">
                    <Button
                      type={`button`}
                      className={`bg-second text-light w-100`}
                      text={`Add`}
                      onClick={addDetails}
                    />
                  </div>
                  <div className="col-12">
                    <ul className="showDetails">
                      {
                        details?.map((res, id) => {
                          return (
                            <li>
                              {attrName == "Color" && <span style={{ backgroundColor: `${res}` }} className='colorBall'></span>}
                              <span>{res}</span>
                              <span className="cencalDetails" onClick={() => removeDetails(id)}><i class="ri-close-circle-line"></i></span>
                            </li>
                          )
                        })
                      }
                    </ul>
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

export default AttributesDialogue;
