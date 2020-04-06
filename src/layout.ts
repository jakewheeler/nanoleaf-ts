import axios from 'axios';
import { LightValues, LayoutValue } from './interfaces/Nanoleaf.interfaces';

export default class Layout {
  private _url: string;

  constructor(url: string) {
    this._url = `${url}/panelLayout`;
  }

  public getGlobalOrientation = async (): Promise<LightValues> => {
    try {
      const globalOrientationUrl = `${this._url}/globalOrientation`;
      const response = await axios.get<LightValues>(globalOrientationUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public setGlobalOrientation = async (value: number) => {
    try {
      if (value < 0 || value > 360)
        throw new Error(
          'Global orientation value is out of range. Value must be in the range 0-360.'
        );
      const globalOrientationUrl = `${this._url}/globalOrientation`;
      const body = {
        globalOrientation: { value }
      };
      await axios.put(globalOrientationUrl, body);
    } catch (err) {
      throw err;
    }
  };

  public getLayout = async (): Promise<LayoutValue> => {
    try {
      const layoutUrl = `${this._url}/layout`;
      const response = await axios.get<LayoutValue>(layoutUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}
