import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function Editor() {
  const [value, setValue] = useState('');

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default memo(Editor);
