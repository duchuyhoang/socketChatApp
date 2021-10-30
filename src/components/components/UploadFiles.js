import React from 'react';

const UploadFiles = ({ children, onAddImages = () => {}, ...rest }) => {
  const handleChange = (e) => {
    onAddImages(e.target.files);
  };

  return (
    <label className='upload-files'>
      <input type='file' {...rest} onChange={handleChange} />
      {children}
    </label>
  );
};

export default UploadFiles;
