import { put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN_REQ, LOGIN_CHECK_REQ, REGISTER_REQ } from '../action-type';
import actions, { ActionsType} from '../actions';
import NetHandler from 'net/netHandler';
import { defaultGet, defaultPost, defaultPostJson } from './saga'

export function* login(action: ActionsType) {
  yield defaultPostJson('user/login', action, actions.resLogin);
}

export function* loginCheck(action: ActionsType) {
  yield defaultPostJson('user/login-check', action, actions.resLogin);
}

export function* register(action: ActionsType) {
  yield defaultPostJson('user/register', action, actions.resRegister);
}

export default function* app() {
  yield takeLatest(LOGIN_REQ, login);
  yield takeLatest(LOGIN_CHECK_REQ, loginCheck);
  yield takeLatest(REGISTER_REQ, register);
  // yield put(loadHitokoto());
}
