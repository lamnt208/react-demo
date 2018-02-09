
import firebaseApp from 'containers/App/firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loadDataItem } from './actions';

const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);

function* getListItem() {
  try {
    const response = yield call(reduxSagaFirebase.database.read, 'locations');
    const data = Array.from([]);
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
          data.push(response[key]);
      }
    }
    yield put(loadDataItem(data));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

export function* loadData() {
  // Watches for LOAD_LIST_ITEM actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest('LOAD_LIST_ITEM', getListItem);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [loadData];
