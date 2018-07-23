import app from './app'
import user from './user'
import { all } from 'redux-saga/effects'

export default function* saga() {
  yield all([app(), user()])
} 