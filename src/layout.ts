import axios from 'axios';
import { LightValues, LayoutValue } from './interfaces/Nanoleaf.interfaces';

export class Layout {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/panelLayout`;
  }

  public getGlobalOrientation = async (): Promise<LightValues> => {
    try {
      const globalOrientationUrl = `${this.url}/globalOrientation`;
      const response = await axios.get<LightValues>(globalOrientationUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public getLayout = async (): Promise<LayoutValue> => {
    try {
      const layoutUrl = `${this.url}/layout`;
      const response = await axios.get<LayoutValue>(layoutUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}
