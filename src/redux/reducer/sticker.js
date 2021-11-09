import { createActions, createReducer } from "reduxsauce";
import { createSelector } from "reselect";

const { Types, Creators } = createActions({
  getListStickerCategory: ["payload"],
  getListStickerCategorySucceed: ["payload"],
  getListStickerCategoryFail: ["payload"],
  getListStickerByCategory: ["payload"],
  getListStickerByCategorySucceed: ["payload"],
  getListStickerByCategoryFail: ["payload"],
});

const STICKET_INITIAL_STATE = {
  listSticker: {},
  listStickerCategory: [],
  listStickerCategoryLoading: "idle",
  listStickerLoading: "idle",
};

export const StickerActions = Creators;
export const StickerTypes = Types;

const handleGetListStickerCategorySucceed = (state, { payload }) => {
  return {
    ...state,
    listStickerCategoryLoading: "fulfilled",
    listStickerCategory: payload.data,
  };
};

const handleGetListStickerCategoryFail = (state, payload) => {
  return { ...state, listStickerCategoryLoading: "failed" };
};

const handleGetListStickerSucceed = (state, { payload }) => {
  const { data, id_category } = payload;
  const newListSticker = state.listSticker;
  newListSticker[id_category] = data.data;
  return {
    ...state,
    listStickerLoading: "fulfilled",
    listSticker: newListSticker,
  };
};

const handleGetListStickerFail = (state, { payload }) => {
  return {
    ...state,
    listStickerLoading: "failed",
  };
};

const selectSelf = (state) => state.sticker;

export const StickerSelectors = {
  selectGetListStickerCategoryLoading: createSelector(
    selectSelf,
    (state) => state.listStickerCategoryLoading
  ),
  selectGetListStickerLoading:createSelector(
    selectSelf,
    (state)=>state.listStickerLoading
  ),
  selectListStickerCategory: createSelector(
    selectSelf,
    (state) => state.listStickerCategory
  ),
  selectListStickerByCategory: (id_category) =>
    createSelector(selectSelf, (state) => {
      if (id_category === null) return [];
      return state.listSticker[id_category] || [];
    }),
};

export const StickerReducer = createReducer(STICKET_INITIAL_STATE, {
  [StickerTypes.GET_LIST_STICKER_CATEGORY_SUCCEED]:
    handleGetListStickerCategorySucceed,
  [StickerTypes.GET_LIST_STICKER_CATEGORY_FAIL]:
    handleGetListStickerCategoryFail,
  [StickerTypes.GET_LIST_STICKER_BY_CATEGORY]:(state)=>{return {...state,listStickerLoading:"idle"}},
  [StickerTypes.GET_LIST_STICKER_BY_CATEGORY_SUCCEED]:
    handleGetListStickerSucceed,
  [StickerTypes.GET_LIST_STICKER_BY_CATEGORY_FAIL]: handleGetListStickerFail,
});
