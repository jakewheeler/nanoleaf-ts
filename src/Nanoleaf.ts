import axios from 'axios';
import {
  NanoleafProperties,
  NanoleafAttributes
} from './interfaces/Nanoleaf.interfaces';
import { NanoleafState } from './nanoleafState';

class Nanoleaf {
  private userData: NanoleafProperties;
  private baseURL: string;
  private nState: NanoleafState;

  constructor(userData: NanoleafProperties) {
    this.userData = userData;
    this.baseURL = `http://${this.userData.ipAddress}:${this.userData.port}${this.userData.apiVersion}${this.userData.authToken}`;
    this.nState = new NanoleafState(this.baseURL);
  }

  public controllerInfo = async (): Promise<NanoleafAttributes> => {
    try {
      const controllerInfo = await axios.get<NanoleafAttributes>(this.baseURL);
      const info = controllerInfo.data;
      return info;
    } catch (err) {
      throw err;
    }
  };

  public get state(): NanoleafState {
    return this.nState;
  }
}

export default Nanoleaf;
