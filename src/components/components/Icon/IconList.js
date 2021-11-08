import React, { useEffect } from "react";
import SpinLoading from "../../shared/SpinLoading";
import {
  StickerActions,
  StickerSelectors,
} from "../../../redux/reducer/sticker";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../../shared/Grid";
// import { Sticker } from "../Sticker/Sticker";
import { PreviewSticker } from "../Sticker/PreviewSticker";
import SVGIcon from '../../shared/SVGIcon';

export const IconList = (props) => {
  const { selectedIconCategory, setSelectedIconCategory } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedIconCategory !== null) {
      dispatch(
        StickerActions.getListStickerByCategory({
          id_category: selectedIconCategory,
        })
      );
    }
  }, [selectedIconCategory]);

  const listSticker = useSelector(
    StickerSelectors.selectListStickerByCategory(selectedIconCategory)
  );

  const iconListLoading = useSelector(
    StickerSelectors.selectGetListStickerLoading
  );

  return (
    <>
      {iconListLoading === "idle" ? (
        <SpinLoading />
      ) : (
          <>
        <div style={{textAlign: 'right'}} >
            <SVGIcon name="close" onClick={()=>{setSelectedIconCategory(null)}} />
        </div>
        <Grid col={4}>
          {listSticker.map((sticker) => (
            <PreviewSticker
              framesPerRow={sticker.blocksOfHeight}
              framesPerColumn={sticker.blocksOfWidth}
              src={sticker.iconUrl}
              width={sticker.width}
              height={sticker.height}
              totalFrames={sticker.totalFrames}
            />
          ))}
        </Grid>
        </>
      )}
    </>
  );
};
