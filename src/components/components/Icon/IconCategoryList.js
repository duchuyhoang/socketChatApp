import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StickerActions,
  StickerSelectors,
} from '../../../redux/reducer/sticker';
import Grid from '../../shared/Grid';
import SpinLoading from '../../shared/SpinLoading';
import { IconList } from './IconList';
export const IconCategoryList = () => {
  const dispatch = useDispatch();
  const [selectedStickerCategory, setSelectedStickerCategory] = useState(null);
  const listStickerCategoryLoading = useSelector(
    StickerSelectors.selectGetListStickerCategoryLoading
  );
  const listStickerCategory = useSelector(
    StickerSelectors.selectListStickerCategory
  );
  // console.log(listSticker);

  useEffect(() => {
    if (
      listStickerCategory.length === 0 &&
      listStickerCategoryLoading === 'idle'
    ) {
      dispatch(StickerActions.getListStickerCategory());
    }
  }, []);

  useEffect(() => {}, [selectedStickerCategory]);

  const handleChooseStickerCategory = useCallback((id) => {
    setSelectedStickerCategory(id);
  }, []);

  return (
    <>
      <section className='iconContainer'>
        {selectedStickerCategory === null ? (
          <>
            {listStickerCategoryLoading === 'idle' ? (
              <SpinLoading />
            ) : (
              <Grid col={2}>
                {listStickerCategory.map((stickerCategory) => (
                  <div
                    key={stickerCategory.id}
                    className='iconCategoryItem'
                    onClick={() => {
                      handleChooseStickerCategory(stickerCategory.id);
                    }}
                  >
                    {stickerCategory.name}
                  </div>
                ))}
              </Grid>
            )}
          </>
        ) : (
          <IconList
            selectedIconCategory={selectedStickerCategory}
            setSelectedIconCategory={setSelectedStickerCategory}
          />
        )}
      </section>
    </>
  );
};
