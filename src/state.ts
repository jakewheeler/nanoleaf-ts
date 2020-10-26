import Request from './request';
import { OnOffState, LightValues } from './interfaces/Nanoleaf.interfaces';

export default class State {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/state`;
  }

  async isTurnedOn(): Promise<boolean> {
    try {
      const onOffUrl = `${this.url}/on`;
      const { value } = await Request.get<OnOffState>(onOffUrl);

      return value;
    } catch (err) {
      throw err;
    }
  };

  async toggleOnOffState(): Promise<boolean> {
    const isOn = await this.isTurnedOn();
    const currentState = await this.modifyOnOffState(isOn);
    return currentState;
  };

  async getBrightness(): Promise<LightValues> {
    try {
      const brightnessUrl = `${this.url}/brightness`;
      const response = await Request.get<LightValues>(brightnessUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  async getHue(): Promise<LightValues> {
    try {
      const hueUrl = `${this.url}/hue`;
      const response = await Request.get<LightValues>(hueUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  async getSaturation(): Promise<LightValues> {
    try {
      const satUrl = `${this.url}/sat`;
      const response = await Request.get<LightValues>(satUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  async getColorTemperature(): Promise<LightValues> {
    try {
      const ctUrl = `${this.url}/ct`;
      const response = await Request.get<LightValues>(ctUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

   async getColorMode(): Promise<string> {
    try {
      const colorModeUrl = `${this.url}/colorMode`;
      const response = await Request.get<string>(colorModeUrl);
      return response;
    } catch (err) {
      throw err;
    }
  };

  async setBrightness(
    value: number,
    duration?: number
  ): Promise<void> {
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

  async setHue(value: number): Promise<void> {
    try {
      if (value < 0 || value > 360)
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

  async setSaturation(value: number): Promise<void> {
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

  async setColorTemperature(value: number): Promise<void> {
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

  async modifyOnOffState (state: boolean): Promise<boolean> {
    try {
      const body = {
        on: {
          value: !state,
        },
      };
      await Request.put(this.url, body);
      return !state;
    } catch (err) {
      throw err;
    }
  };
}
