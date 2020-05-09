export interface NanoleafProperties {
  ipAddress: string;
  apiVersion?: string;
  authToken: string;
  port?: string;
}

export interface OnOffState {
  value: boolean;
}

export interface LightValues {
  value: number;
  max: number;
  min: number;
}

export interface State {
  brightness: LightValues;
  colorMode: string;
  ct: LightValues;
  hue: LightValues;
  on: OnOffState;
  sat: LightValues;
}

export interface Effect {
  effectsList: string[];
  select: string;
}

export interface PanelLayout {
  globalOrientation: LightValues;
  layout: LayoutValue;
}

export interface LayoutValue {
  numPanels: number;
  sideLength: number;
  positionData: object[];
}

export interface Rhythm {
  auxAvailable: boolean;
  firmwareVersion: string;
  hardwareVersion: string;
  rhythmActive: boolean;
  rhythmConnected: boolean;
  rhythmId: number;
  rhythmMode: number;
  rhythmPos: PositionData;
}

export interface PositionData {
  x: number;
  y: number;
  o: number;
}

export interface NanoleafAttributes {
  name: string;
  serialNo: string;
  manufacturer: string;
  firmwareVersion: string;
  hardwareVersion: string;
  model: string;
  cloudHash: object;
  discovery: object;
  effects: Effect;
  firmwareUpgrade: object;
  panelLayout: PanelLayout;
  rhythm: Rhythm;
  schedules: object;
  state: State;
}
