import axios from 'axios';
import { IOnOffState } from './interfaces/Nanoleaf.interfaces';

export class NanoleafState {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/state`;
  }

  public isTurnedOn = async (): Promise<boolean> => {
    try {
      const onOffUrl = `${this.url}/on`;
      const currentState = await axios.get<IOnOffState>(onOffUrl);
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

  private modifyOnOffState = async (state: boolean): Promise<void> => {
    console.log(state);
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

  public turnOn = async (): Promise<boolean> => {
    try {
      const isOn = await this.isTurnedOn();
      if (!isOn) {
        const body = {
          on: {
            value: true
          }
        };
        await axios.put(this.url, body);
        return true;
      }

      return false;
    } catch (err) {
      throw err;
    }
  };

  public turnOff = async () => {
    try {
      const isOn = await this.isTurnedOn();
      if (isOn) {
        const body = {
          on: {
            value: false
          }
        };
        await axios.put(this.url, body);
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  };
}
