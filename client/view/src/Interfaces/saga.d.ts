
import { Reducer, AnyAction } from 'redux';

export interface IReducer {
  key: string;
  reducer: Reducer<any, AnyAction>;
}

export interface ISaga {
  key: string;
  saga: () => IterableIterator<any>;
  mode?: any
}