import {
  CRYPTOCURRENCY_PAGE_LOADED,
  CRYPTOCURRENCY_PAGE_UNLOADED,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case CRYPTOCURRENCY_PAGE_LOADED:
      return {
        ...state,
        cryptocurrency: action.payload[0].cryptocurrency,
        comments: action.payload[1].comments
      };
    case CRYPTOCURRENCY_PAGE_UNLOADED:
      return {};
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error
          ? null
          : (state.comments || []).concat([action.payload.comment])
      };
    case DELETE_COMMENT:
      const commentId = action.commentId;
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      };
    default:
      return state;
  }
};
