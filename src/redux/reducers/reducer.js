import { SEARCH_RESULTS } from '../actions';

const INITIAL_STATE = {
  recepies: [],
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_RESULTS: {
    return {
      ...state,
      recepies: action.payload,
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default reducer;
