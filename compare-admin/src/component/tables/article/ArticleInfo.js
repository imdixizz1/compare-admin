import { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const ArticleInfo = ({placeholder}) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");



  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        // config={config}
        tabIndex={1} 
        // onBlur={(newContent) => setContent(newContent)} 
        onChange={(newContent) => setContent(newContent)}
      />
    </>
  );
};

export default ArticleInfo;
