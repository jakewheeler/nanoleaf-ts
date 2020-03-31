export interface NanoleafProperties {
  ipAddress: string;
  apiVersion: string;
  authToken: string;
  port: string;
}

export interface OnOffState {
  value: boolean;
}

export interface Brightness {
  value: number;
  max: number;
  min: number;
}

export interface State {
  brightness: Brightness;
  colorMode: string;
  ct: { value: number; max: number; min: number };
  hue: { value: number; max: number; min: number };
  on: OnOffState;
  sat: { value: 0; max: number; min: number };
}

export interface Effects {
  effectsList: string[];
  select: string;
}

export interface PanelLayout {
  globalOrientation: { value: number; max: number; min: 0 };
  layout: { numpPanels: number; sideLength: number; positionData: [[]] };
}

export interface Rhythm {
  auxAvailable: boolean;
  firmwareVersion: string;
  hardwareVersion: string;
  rhythmActive: boolean;
  rhythmConnected: boolean;
  rhythmId: number;
  rhythmMode: number;
  rhythmPos: { x: number; y: number; o: number };
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
  effects: Effects;
  firmwareUpgrade: object;
  panelLayout: PanelLayout;
  rhythm: Rhythm;
  schedules: object;
  state: State;
}
