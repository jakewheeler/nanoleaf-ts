import axios from 'axios';
import { NanoleafProperties } from './interfaces/Nanoleaf.interfaces';

class Nanoleaf {
  private userData: NanoleafProperties;
  private baseURL: string;

  constructor(userData: NanoleafProperties) {
    this.userData = userData;
    this.baseURL = `http://${this.userData.ipAddress}:${this.userData.port}${this.userData.apiVersion}${this.userData.authToken}`;
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
}

export default Nanoleaf;
