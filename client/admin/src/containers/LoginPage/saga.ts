import { put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_HITOKOTO, LOGIN_REQ, LOGIN_RES } from './constants';
import actions, { LoginActionType} from './actions';
import NetHandler from 'net/netHandler';

export function* login(action: LoginActionType) {
  try {
    const data = yield call(NetHandler.post, 'user/login', action.payload);
    yield put(actions.resLogin(data));
  } catch (err) {
    yield put(actions.resLogin({code: -1, message: '登陆失败'}));
  }
}

export default function* hitokotoData() {
  yield takeLatest(LOGIN_REQ, login);
  // yield put(loadHitokoto());
}
