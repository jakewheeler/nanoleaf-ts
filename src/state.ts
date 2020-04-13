import Request from './request';
import { OnOffState, LightValues } from './interfaces/Nanoleaf.interfaces';

export default class State {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/state`;
  }

  public isTurnedOn = async (): Promise<boolean> => {
    try {
      const onOffUrl = `${this.url}/on`;
      const { value } = await Request.get<OnOffState>(onOffUrl);

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
      const response = await Request.get<LightValues>(brightnessUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  public getHue = async (): Promise<LightValues> => {
    try {
      const hueUrl = `${this.url}/hue`;
      const response = await Request.get<LightValues>(hueUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  public getSaturation = async (): Promise<LightValues> => {
    try {
      const satUrl = `${this.url}/sat`;
      const response = await Request.get<LightValues>(satUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  public getColorTemperature = async (): Promise<LightValues> => {
    try {
      const ctUrl = `${this.url}/ct`;
      const response = await Request.get<LightValues>(ctUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  public getColorMode = async (): Promise<string> => {
    try {
      const colorModeUrl = `${this.url}/colorMode`;
      const response = await Request.get<string>(colorModeUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  public setBrightness = async (
    value: number,
    duration?: number
  ): Promise<void> => {
    try {
      if (value < 0 || value > 100)
        throw new Error(
          'Brightness value out of range. Must be within range 0-100.'
        );

      const body = {
        brightness: {
          value,
          duration,
        },
      };
      await Request.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };

  public setHue = async (value: number): Promise<void> => {
    try {
      if (value < 0 || value > 361)
        throw new Error('Hue value out of range. Must be within range 0-360.');
      const body = {
        hue: {
          value,
        },
      };
      await Request.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };

  public setSaturation = async (value: number) => {
    try {
      if (value < 0 || value > 100)
        throw new Error(
          'Saturation value out of range. Must be within range 0-100.'
        );
      const body = {
        sat: {
          value,
        },
      };
      await Request.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };

  public setColorTemperature = async (value: number) => {
    try {
      if (value < 1200 || value > 6500)
        throw new Error(
          'Color temperature value out of range. Must be within range 1200-6500.'
        );
      const body = {
        ct: {
          value,
        },
      };
      await Request.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };

  private modifyOnOffState = async (state: boolean): Promise<void> => {
    try {
      const body = {
        on: {
          value: !state,
        },
      };
      await Request.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };
}
