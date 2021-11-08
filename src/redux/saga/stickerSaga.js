import { call, put, select } from "@redux-saga/core/effects";
import { HttpStatusCode } from "../../common/constant";
import {
  getListStickerCategory,
  getListStickerByCategory,
} from "../../services/apiMap";
import { StickerActions } from "../../redux/reducer/sticker";
export const StickerSaga = {
  *getStickerCategory() {
    try {
      const response = yield call(() => getListStickerCategory());
      if (response.status === HttpStatusCode.SUCCESS) {
        console.log(response);
        yield put(StickerActions.getListStickerCategorySucceed(response.data));
      } else {
        yield put(StickerActions.getListStickerCategoryFail());
      }
    } catch (err) {
      yield put(StickerActions.getListStickerCategoryFail());
    }
  },

  *getStickerByCategory({ payload }) {
    try {
      const listSticker = yield select((state) => state.sticker.listSticker);
      if (listSticker[payload.id_category]) {
        yield put(
          StickerActions.getListStickerByCategorySucceed({
            data:{
              data: listSticker[payload.id_category],
            },
            id_category: payload.id_category,
          })
        );
        return;
      }

      const response = yield call(() =>
        getListStickerByCategory({ id_category: payload.id_category })
      );

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(
          StickerActions.getListStickerByCategorySucceed({
            data: response.data,
            id_category: payload.id_category,
          })
        );
      } else {
        yield put(StickerActions.getListStickerByCategoryFail());
      }
    } catch (err) {
      yield put(StickerActions.getListStickerByCategoryFail());
    }
  },
};
