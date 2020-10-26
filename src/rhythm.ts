import Request  from './request';
import { PositionData } from './interfaces/Nanoleaf.interfaces';

export class Rhythm {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/rhythm`;
  }

  async isConnected(): Promise<boolean> {
    try {
      const connectedUrl = `${this.url}/rhythmConnected`;
      const currentState = await Request.get<boolean>(connectedUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async isActive(): Promise<boolean> {
    try {
      const activeUrl = `${this.url}/rhythmActive`;
      const currentState = await Request.get<boolean>(activeUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async getId(): Promise<number> {
    try {
      const idUrl = `${this.url}/rhythmId`;
      const currentState = await Request.get<number>(idUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async getHardwareVersion(): Promise<string> {
    try {
      const hwUrl = `${this.url}/hardwareVersion`;
      const currentState = await Request.get<string>(hwUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async getFirmwareVersion(): Promise<string> {
    try {
      const fwUrl = `${this.url}/firmwareVersion`;
      const currentState = await Request.get<string>(fwUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async isAuxAvailable(): Promise<boolean> {
    try {
      const auxUrl = `${this.url}/auxAvailable`;
      const currentState = await Request.get<boolean>(auxUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async getMode(): Promise<number> {
    try {
      const auxUrl = `${this.url}/rhythmMode`;
      const currentState = await Request.get<number>(auxUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async getPositions(): Promise<PositionData> {
    try {
      const posUrl = `${this.url}/rhythmPos`;
      const currentState = await Request.get<PositionData>(posUrl);
      return currentState;
    } catch (err) {
      throw err;
    }
  };

  async setMode(mode: number = 0): Promise<void> {
    // 0 = microphone mode
    // 1 = aux mode
    try {
      if (mode !== 0 && mode !== 1)
        throw new Error(
          `Rhythm mode value must be 0 for "microphone" or 1 for "aux".`
        );
      const auxUrl = `${this.url}/rhythmMode`;
      const body = {
        rhythmMode: mode,
      };
      await Request.put(auxUrl, body);
    } catch (err) {
      throw err;
    }
  };
}
