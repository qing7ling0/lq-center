import { put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN_REQ, LOGIN_CHECK_REQ } from '../action-type';
import actions, { ActionsType} from '../actions';
import NetHandler from 'net/netHandler';
import { defaultGet, defaultPost } from './saga'

export function* login(action: ActionsType) {
  yield defaultPost('user/login', action, actions.resLogin);
}

export function* loginCheck(action: ActionsType) {
  yield defaultPost('user/login-check', action, actions.resLogin);
}


export default function* app() {
  yield takeLatest(LOGIN_REQ, login);
  yield takeLatest(LOGIN_CHECK_REQ, loginCheck);
  // yield put(loadHitokoto());
}
