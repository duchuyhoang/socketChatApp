import { useCallback, useEffect, useState, useMemo } from "react";
import SpinLoading from "../../shared/SpinLoading";
import {
  StickerActions,
  StickerSelectors,
} from "../../../redux/reducer/sticker";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../../shared/Grid";
import { IconList } from "./IconList";
export const IconCategoryList = () => {
  const dispatch = useDispatch();
  const [selectedStickerCategory, setSelectedStickerCategory] = useState(null);
  const listSticketCategoryLoading = useSelector(
    StickerSelectors.selectGetListStickerCategoryLoading
  );
  const listStickerCategory = useSelector(
    StickerSelectors.selectListStickerCategory
  );

  // console.log(listSticker);

  useEffect(() => {
    if (
      listStickerCategory.length === 0 &&
      listSticketCategoryLoading === "idle"
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
      <section className="iconContainer">
        {selectedStickerCategory === null ? (
          <>
            {listSticketCategoryLoading === "idle" ? (
              <SpinLoading />
            ) : (
              <Grid col={2}>
                {listStickerCategory.map((sticketCategory) => (
                  <div
                    className="iconCategoryItem"
                    onClick={() => {
                      handleChooseStickerCategory(sticketCategory.id);
                    }}
                  >
                    {sticketCategory.name}
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
