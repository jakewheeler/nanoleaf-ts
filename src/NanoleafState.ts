import axios from 'axios';
import { OnOffState, Brightness } from './interfaces/Nanoleaf.interfaces';

export class NanoleafState {
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

  public brightness = async (): Promise<Brightness> => {
    try {
      const brightnessUrl = `${this.url}/brightness`;
      const response = await axios.get<Brightness>(brightnessUrl);
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
