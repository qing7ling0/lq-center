import {IResponse} from 'Interfaces/response';
import { DEBUG, DEV_SERVER, PROD_SERVER } from 'constants/constants';
import NetUtils from './netUtils';

const SERVER_ADDRESS = (DEBUG ? DEV_SERVER : PROD_SERVER) + '/';

export default class NetHandler {
  static get(url: string, data: any): Promise<IResponse> {
    return NetUtils.get(SERVER_ADDRESS + url, data);
  }

  static post(url: string, data: any): Promise<IResponse> {
    return NetUtils.post(SERVER_ADDRESS + url, data);
  }

}
