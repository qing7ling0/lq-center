import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_USER_LIST_REQ, RESET_PASSWORD_REQ, RESET_PASSWORD_TOKEN_REQ } from '../action-type';
import actions, { ActionsType} from '../actions';
import NetHandler from 'net/netHandler';
import { defaultGet, defaultPost } from './saga'

export function* getUserList(action: ActionsType) {
  // try {
  //   const data = yield call(NetHandler.post, 'user/login', action.payload);
  //   yield put(actions.resLogin(data));
  // } catch (err) {
  //   yield put(actions.resLogin({code: -1, message: '登陆失败'}));
  // }

  yield put(actions.resGetUserList({code:-1, data:null, message: '获取失败！'}))
}

export function* resetPassword(action: ActionsType) {
  yield defaultPost('user/resetpw', action, actions.resResetPassword);
}

export function* resetPasswordToken(action: ActionsType) {
  yield defaultPost('user/resetpw_token', action, actions.resResetPassword);
}

export default function* app() {
  yield takeLatest(GET_USER_LIST_REQ, getUserList);
  yield takeLatest(RESET_PASSWORD_REQ, resetPassword);
  yield takeLatest(RESET_PASSWORD_TOKEN_REQ, resetPasswordToken);
  // yield put(loadHitokoto());
}
