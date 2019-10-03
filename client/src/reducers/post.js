import {
  GET_POSTS,
  CREATE_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  error: {},
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        post: null,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_COMMENT:
    case REMOVE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    default:
      return state;
  }
};
