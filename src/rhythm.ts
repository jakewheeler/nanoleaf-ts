import axios from 'axios';
import { PositionData } from './interfaces/Nanoleaf.interfaces';

export default class Rhythm {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/rhythm`;
  }

  public isConnected = async (): Promise<boolean> => {
    try {
      const connectedUrl = `${this.url}/rhythmConnected`;
      const currentState = await axios.get<boolean>(connectedUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public isActive = async (): Promise<boolean> => {
    try {
      const activeUrl = `${this.url}/rhythmActive`;
      const currentState = await axios.get<boolean>(activeUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public getId = async (): Promise<number> => {
    try {
      const idUrl = `${this.url}/rhythmId`;
      const currentState = await axios.get<number>(idUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public getHardwareVersion = async (): Promise<string> => {
    try {
      const hwUrl = `${this.url}/hardwareVersion`;
      const currentState = await axios.get<string>(hwUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public getFirmwareVersion = async (): Promise<string> => {
    try {
      const fwUrl = `${this.url}/firmwareVersion`;
      const currentState = await axios.get<string>(fwUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public isAuxAvailable = async (): Promise<boolean> => {
    try {
      const auxUrl = `${this.url}/auxAvailable`;
      const currentState = await axios.get<boolean>(auxUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public getMode = async (): Promise<number> => {
    try {
      const auxUrl = `${this.url}/rhythmMode`;
      const currentState = await axios.get<number>(auxUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public getPositions = async (): Promise<PositionData> => {
    try {
      const posUrl = `${this.url}/rhythmPos`;
      const currentState = await axios.get<PositionData>(posUrl);
      return currentState.data;
    } catch (err) {
      throw err;
    }
  };

  public setMode = async (mode: string = 'microphone'): Promise<void> => {
    // 0 = microphone mode
    // 1 = aux mode
    try {
      if (mode !== 'microphone' && mode !== 'aux')
        throw new Error(`Rhythm mode value must be "microphone" or "aux".`);
      const auxUrl = `${this.url}/rhythmMode`;
      const rhythmMode = mode === 'microphone' ? 0 : 1;
      const body = {
        rhythmMode: rhythmMode
      };
      await axios.put(auxUrl, body);
    } catch (err) {
      throw err;
    }
  };
}
