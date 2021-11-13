import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { MESSAGE_TYPE } from '../../../common/constant';
import { selectUser } from '../../../redux/reducer/auth';
import { selectMainConversation } from '../../../redux/reducer/conversation';
import { MessageActions } from '../../../redux/reducer/message';
import {
  StickerActions,
  StickerSelectors,
} from '../../../redux/reducer/sticker';
import Grid from '../../shared/Grid';
import SpinLoading from '../../shared/SpinLoading';
import SVGIcon from '../../shared/SVGIcon';
// import { Sticker } from "../Sticker/Sticker";
import { PreviewSticker } from '../Sticker/PreviewSticker';

export const IconList = (props) => {
  const { selectedIconCategory, setSelectedIconCategory } = props;

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const { conversationInfo = {} } = useSelector(selectMainConversation) || {};

  const handleClickSticker = (sticker) => {
    const idPreview = v4();
    dispatch(
      MessageActions.insertPreviewMessages({
        type: MESSAGE_TYPE.ICON,
        content: '',
        listImages: [],
        idUser: +user.id_user,
        icon: sticker,
        avatar: user.avatar,
        sex: user.sex,
        idPreview,
      })
    );

    const dataMessage = new FormData();
    dataMessage.append('type', MESSAGE_TYPE.ICON);
    dataMessage.append('content', '');
    dataMessage.append('id_preview', idPreview);
    dataMessage.append('id_conversation', conversationInfo.id_room);
    dataMessage.append('id_icon', sticker.id_icon);

    dispatch(MessageActions.sendMessage({ data: dataMessage, idPreview }));
  };

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
      {iconListLoading === 'idle' ? (
        <SpinLoading />
      ) : (
        <>
          <div style={{ textAlign: 'right' }}>
            <SVGIcon
              name='close'
              onClick={() => {
                setSelectedIconCategory(null);
              }}
            />
          </div>
          <Grid col={4}>
            {listSticker.map((sticker) => (
              <PreviewSticker
                key={sticker.id_icon}
                framesPerRow={sticker.blocksOfHeight}
                framesPerColumn={sticker.blocksOfWidth}
                src={sticker.iconUrl}
                width={sticker.width}
                height={sticker.height}
                totalFrames={sticker.totalFrames}
                onClick={() => handleClickSticker(sticker)}
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};
