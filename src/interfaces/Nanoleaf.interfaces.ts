export interface INanoleafProperties {
  ipAddress: string;
  apiVersion: string;
  authToken: string;
  port: string;
}

export interface IOnOffState {
  value: boolean;
}

export interface IState {
  brightness: { value: number; max: number; min: number };
  colorMode: string;
  ct: { value: number; max: number; min: number };
  hue: { value: number; max: number; min: number };
  on: IOnOffState;
  sat: { value: 0; max: number; min: number };
}
