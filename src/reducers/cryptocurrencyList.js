import {
  CRYPTOCURRENCY_FAVORITED,
  CRYPTOCURRENCY_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case CRYPTOCURRENCY_FAVORITED:
    case CRYPTOCURRENCY_UNFAVORITED:
      return {
        ...state,
        cryptocurrency: state.cryptocurrency.map(cryptocurrency => {
          if (cryptocurrency.slug === action.payload.cryptocurrency.slug) {
            return {
              ...cryptocurrency,
              favorited: action.payload.cryptocurrency.favorited,
              favoritesCount: action.payload.cryptocurrency.favoritesCount
            };
          }
          return cryptocurrency;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        cryptocurrency: action.payload.cryptocurrency,
        cryptocurrencyCount: action.payload.cryptocurrencyCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        cryptocurrency: action.payload.cryptocurrency,
        cryptocurrencyCount: action.payload.cryptocurrencyCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].tags,
        cryptocurrency: action.payload[1].cryptocurrency,
        cryptocurrencyCount: action.payload[1].cryptocurrencyCount,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        cryptocurrency: action.payload.cryptocurrency,
        cryptocurrencyCount: action.payload.cryptocurrencyCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        cryptocurrency: action.payload[1].cryptocurrency,
        cryptocurrencyCount: action.payload[1].cryptocurrencyCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
