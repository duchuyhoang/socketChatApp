import React, { useState } from 'react';

const Upload = ({ image, onUpload, ...rest }) => {
  const [isUpload, setIsUpload] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUpload(true);

    const url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
    if (onUpload) onUpload(e.target.files[0]);
  };
  return (
    <div className='upload'>
      <div className='upload__preview'>
        <img src={isUpload ? preview : image} alt='avatar' />
      </div>
      <label>
        <input type='file' onChange={handleChange} {...rest} />
      </label>
    </div>
  );
};

export default Upload;
