import axios from 'axios';
import { INanoleafProperties, IState } from './interfaces/Nanoleaf.interfaces';
import { NanoleafState } from './NanoleafState';

class Nanoleaf {
  private userData: INanoleafProperties;
  private baseURL: string;
  private nState: NanoleafState;

  constructor(userData: INanoleafProperties) {
    this.userData = userData;
    this.baseURL = `http://${this.userData.ipAddress}:${this.userData.port}${this.userData.apiVersion}${this.userData.authToken}`;
    this.nState = new NanoleafState(this.baseURL);
  }

  public getControllerInfo = async () => {
    try {
      const controllerInfo = await axios.get(this.baseURL);
      const info = await controllerInfo.data;
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
