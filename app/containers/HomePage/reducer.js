import { fromJS } from 'immutable';

const initialState = fromJS({
  data: [],
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_LIST_ITEM':
      return state.set('loading', true).setIn(['data'], []);
    case 'LOAD_LIST_ITEM_SUCCESS':
      return state.set('loading', false).setIn(['data'], action.data);
    default:
      return state;
  }
}

export default homeReducer;

