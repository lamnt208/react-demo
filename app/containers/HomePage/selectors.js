/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('homeReducer');

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['data'])
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

export { makeSelectRepos, makeSelectLoading };

