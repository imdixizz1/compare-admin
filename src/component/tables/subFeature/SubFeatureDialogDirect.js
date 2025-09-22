/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import Button from '../../extra/Button';
import { ExInput, Textarea } from '../../extra/Input';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../redux/slice/dialogSlice';
import {
    subFeatureAdd,
    subFeatureUpdate,
} from '../../../redux/slice/subFeatureSlice';
import { featureGet } from '../../../redux/slice/featureSlice';

const SubFeatureDialogDirect = () => {
    const dispatch = useDispatch();
    const { dialogueData } = useSelector((state) => state.dialogue);
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [featureId, setFeatureId] = useState({});
    const [error, setError] = useState({
        featureId: '',
        name: '',
        image: '',
    });

    const { feature } = useSelector((state) => state.feature);

    useEffect(() => {
        const payload = {
            start: 1,
            limit: 25,
        };
        dispatch(featureGet(payload));
    }, [dispatch]);

    console.log("feature", feature);

    const handleSubmit = () => {
        
        if (!image || !imagePath || !name || !featureId) {
            let error = {};
            if (!name) error.name = 'name is required';
            if (!image) error.image = 'image is required';
            if (!featureId) error.featureId = 'feature is required';

            return setError({ ...error });
        }

        {
            const formData = new FormData();
            formData.append('icon', image);
            formData.append('name', name);

            const payload = { formData, id: featureId._id };
            dispatch(subFeatureAdd(payload)).unwrap();
        }
        dispatch(closeDialog());
    };

    console.log("dialogueData", dialogueData);
    useEffect(() => {
        if (dialogueData) {
            setFeatureId(dialogueData.featueId);
        }
    }, [dialogueData]);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setImagePath(URL.createObjectURL(e.target.files[0]));
        setError((prevErrors) => ({
            ...prevErrors,
            image: "",
        }));
    };

    return (
        <div className="dialog">
            <div class="w-100">
                <div class="row justify-content-center">
                    <div class="col-xl-4 col-md-6 col-11">
                        <div class="mainDiaogBox">
                            <div class="row justify-content-between align-items-center formHead">
                                <div className="col-8">
                                    <h2 className="text-theme m0">Subfeature Dialog</h2>
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

                                <div class="col-12 col-md-6">
                                    <div className="inputData">
                                        <label className=" " htmlFor="featureId">
                                            Feature
                                        </label>
                                        <div>
                                            <select
                                                name="featureId"
                                                className="rounded-2 "
                                                id="featureId"
                                                value={featureId}
                                                onChange={(e) => {
                                                    setFeatureId(e.target.value);
                                                    if (!e.target.value) {
                                                        return setError({
                                                            ...error,
                                                            featureId: 'featureId is Required !',
                                                        });
                                                    } else {
                                                        setError({
                                                            ...error,
                                                            featureId: '',
                                                        });
                                                    }
                                                }}
                                            >
                                                <option
                                                    value={
                                                        dialogueData ? dialogueData?.featureId?._id : ''
                                                    }
                                                    selected
                                                    disabled={dialogueData && true}
                                                >
                                                    {dialogueData
                                                        ? dialogueData?.featureId?.featureName
                                                        : '--Select Feature--'}
                                                </option>

                                                {!dialogueData &&
                                                    feature.map((data) => {
                                                        return (
                                                            <option value={data._id}>
                                                                {data?.featureName}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                    {error?.featureId && (
                                        <div className="inputData">
                                            <p className="errorMessage text-start text-capitalize">
                                                {error && error?.featureId}
                                            </p>
                                        </div>
                                    )}
                                </div>

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
                                        </div>
                                    )}
                                    <img
                                        src={imagePath ? imagePath : null}
                                        alt=""
                                        draggable="false"
                                        className={`${(!imagePath || imagePath === '') && 'd-none'
                                            } `}
                                        data-class={`showImage`}
                                        style={{ width: '100px', height: '100px' }}
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

export default SubFeatureDialogDirect;
