import axios from 'axios';
import { OnOffState, LightValues } from './interfaces/Nanoleaf.interfaces';

export class State {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/state`;
  }

  public isTurnedOn = async (): Promise<boolean> => {
    try {
      const onOffUrl = `${this.url}/on`;
      const currentState = await axios.get<OnOffState>(onOffUrl);
      let { value } = currentState.data;

      return value;
    } catch (err) {
      throw err;
    }
  };

  public toggleOnOffState = async (): Promise<void> => {
    const isOn = await this.isTurnedOn();
    const currentState = await this.modifyOnOffState(isOn);
    return currentState;
  };

  public getBrightness = async (): Promise<LightValues> => {
    try {
      const brightnessUrl = `${this.url}/brightness`;
      const response = await axios.get<LightValues>(brightnessUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public getHue = async (): Promise<LightValues> => {
    try {
      const hueUrl = `${this.url}/hue`;
      const response = await axios.get<LightValues>(hueUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public getSaturation = async (): Promise<LightValues> => {
    try {
      const satUrl = `${this.url}/sat`;
      const response = await axios.get<LightValues>(satUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public getColorTemperature = async (): Promise<LightValues> => {
    try {
      const ctUrl = `${this.url}/ct`;
      const response = await axios.get<LightValues>(ctUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public getColorMode = async (): Promise<string> => {
    try {
      const colorModeUrl = `${this.url}/colorMode`;
      const response = await axios.get<string>(colorModeUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  private modifyOnOffState = async (state: boolean): Promise<void> => {
    try {
      const body = {
        on: {
          value: !state
        }
      };
      await axios.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };
}
