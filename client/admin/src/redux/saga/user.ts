import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_USER_LIST_REQ } from '../action-type';
import actions, { ActionsType} from '../actions';
import NetHandler from 'net/netHandler';

export function* getUserList(action: ActionsType) {
  // try {
  //   const data = yield call(NetHandler.post, 'user/login', action.payload);
  //   yield put(actions.resLogin(data));
  // } catch (err) {
  //   yield put(actions.resLogin({code: -1, message: '登陆失败'}));
  // }

  yield put(actions.resGetUserList({code:-1, data:null, message: '获取失败！'}))
}

export default function* app() {
  yield takeLatest(GET_USER_LIST_REQ, getUserList);
  // yield put(loadHitokoto());
}
