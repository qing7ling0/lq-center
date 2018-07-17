import app from './app'
import user from './user'

export default function* saga() {
  yield app()
  yield user()
} 