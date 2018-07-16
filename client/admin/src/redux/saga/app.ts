import { put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN_REQ } from '../action-type';
import actions, { ActionsType} from '../actions';
import NetHandler from 'net/netHandler';

export function* login(action: ActionsType) {
  try {
    const data = yield call(NetHandler.post, 'user/login', action.payload);
    yield put(actions.resLogin(data));
  } catch (err) {
    yield put(actions.resLogin({code: -1, message: '登陆失败'}));
  }
}

export default function* app() {
  yield takeLatest(LOGIN_REQ, login);
  // yield put(loadHitokoto());
}
