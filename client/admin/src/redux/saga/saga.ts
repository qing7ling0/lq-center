import { put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN_REQ, LOGIN_CHECK_REQ } from '../action-type';
import { Action } from 'redux'
import actions, { ActionsType} from '../actions';
import NetHandler from 'net/netHandler';
import { IResponse } from 'Interfaces/response';

type ResponseAction = (data:IResponse) => Action

export function* defaultGet(url: string, action: ActionsType, responseAction: ResponseAction) {
  try {
    const data = yield call(NetHandler.get, url, action.payload);
    yield put(responseAction(data));
  } catch (err) {
    yield put(responseAction({code: -1, message: '获取失败！'}));
  }
}

export function* defaultPost(url: string, action: ActionsType, responseAction: ResponseAction) {
  try {
    const data = yield call(NetHandler.post, url, action.payload);
    yield put(responseAction(data));
  } catch (err) {
    yield put(responseAction({code: -1, message: '操作失败！'}));
  }
}
