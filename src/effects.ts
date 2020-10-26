import Request from './request';

type MinMax = {
  maxValue: number;
  minValue: number;
};

type WriteResponse = {
  animName: string;
  loop: boolean;
  palette: {
    hue: number;
    saturation: number;
    brightness: number;
  }[];
  version: string;
  transTime: MinMax;
  windowSize: number;
  flowFactor: number;
  delayTime: MinMax;
  colorType: string;
  animType: string;
  explodeFactor: number;
  brightnessFactor: MinMax;
  direction: string;
};

export class Effects {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/effects`;
  }

  async getCurrent(): Promise<string> {
    try {
      const selectUrl = `${this.url}/select`;
      const resp = await Request.get<string>(selectUrl);
      return resp;
    } catch (err) {
      throw err;
    }
  };

  async getFullList(): Promise<string[]> {
    try {
      const listUrl = `${this.url}/effectsList`;
      const response = await Request.get<string[]>(listUrl);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async setCurrent(effectName: string): Promise<void> {
    try {
      if (effectName === '') throw new Error('An effectName is required');
      if (!(await this.effectExists(effectName)))
        throw new Error(
          `Effect with name "${effectName}" does not exist. Check for capitilization errors.`
        );

      const body = {
        select: effectName,
      };

      await Request.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };

  async setWrite(
    command: string,
    animName: string
  ): Promise<WriteResponse> {
    try {
      if (!command || !animName) throw new Error('Arguments cannot be empty.');
      if (!(await this.effectExists(animName)))
        throw new Error(
          `Animation with name "${animName}" does not exist. Check for capitilization errors.`
        );

      const body = {
        write: {
          command,
          animName,
        },
      };

      const resp = await Request.put<WriteResponse>(this.url, body);
      return resp;
    } catch (err) {
      throw err;
    }
  };

  private async effectExists(effectName: string): Promise<boolean> {
    try {
      const effectList = await this.getFullList();

      return effectList.includes(effectName);
    } catch (err) {
      throw err;
    }
  };
}
