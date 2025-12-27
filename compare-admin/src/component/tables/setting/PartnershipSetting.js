import { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import Title from '../../extra/Title';
import Button from '../../extra/Button';
import { getSetting, updateSetting } from '../../../redux/slice/settingSlice';
import { useDispatch, useSelector } from 'react-redux';

const PartnershipSetting = ({ placeholder }) => {
  const { setting } = useSelector((state) => state.setting);
  const editor = useRef(null);
  const [content, setContent] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => {
    setContent(setting?.partnerships?.content);
  }, [setting]);


  const handleSubmit = () => {
    const settingData = {
      contentOfPartnerships: content,
    };
    const data = {
      settingData,
      id: setting._id,
    };
    dispatch(updateSetting(data));
  };

  return (
    <>
      <div>
        <Title name="Parnership page content" />
      </div>
      <div className="loginButton m15-bottom">
        <Button
          type={`submit`}
          className={`bg-success text-white`}
          text={`Submit`}
          onClick={handleSubmit}
          style={{ borderRadius: '30px' }}
        />
      </div>
      <div>
        <JoditEditor
          // ref={editor}
          value={content}
          // config={config}
          tabIndex={1}
          // onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
    </>
  );
};

export default PartnershipSetting;
