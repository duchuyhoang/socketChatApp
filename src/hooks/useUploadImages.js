import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export const useUploadImages = () => {
  const [listImages, setListImage] = useState([]);
  const [addListImages, setAddListImages] = useState([]);

  useEffect(() => {
    const prevImages = [...listImages];

    for (const value of addListImages) {
      prevImages.push({
        id: v4(),
        toUpload: value,
        previewSrc: URL.createObjectURL(value),
      });
    }

    setListImage(prevImages);

    return () => {
      for (const value of listImages) {
        URL.revokeObjectURL(value.previewSrc);
      }
    };
  }, [addListImages]);

  const deleteImage = (id) => {
    setListImage((prev) =>
      prev.filter((item) => {
        if (item.id === id) URL.revokeObjectURL(item.previewSrc);
        return item.id !== id;
      })
    );
  };

  const clearImages = () => {
    setListImage([]);
    // listImages.forEach((image) => {
    //   URL.revokeObjectURL(image.previewSrc);
    // });
  };

  return {
    listImages,
    setAddListImages,
    deleteImage,
    clearImages,
  };
};
