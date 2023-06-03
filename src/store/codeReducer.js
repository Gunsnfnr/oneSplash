
import {setToken} from '../api/token.js';

const initialState = {
  code: '',
};

const RECEIVE_CODE = 'RECEIVE_CODE';

export const receiveCode = (code) => ({
  type: RECEIVE_CODE,
  code,
});

export const codeMiddleware = (store) => (next) => (action) => {
  if (action.type === RECEIVE_CODE) {
    setToken(action.code);
  }

  next(action);
};


export const codeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CODE:
      return {
        ...state,
        code: action.code,
      };
    default:
      return state;
  }
};
