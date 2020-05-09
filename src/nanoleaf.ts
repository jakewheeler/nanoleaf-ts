import Request from './request';
import {
  NanoleafProperties,
  NanoleafAttributes,
} from './interfaces/Nanoleaf.interfaces';
import State from './state';
import { Effects } from './effects';
import { Layout } from './layout';
import { Rhythm } from './rhythm';
import { Panels } from './panels';

// class NanoleafProperties {
//   private _ipAddress: string;
//   private _apiVersion: string = '/api/v1/';
//   private _authToken: string;
//   private _port: string = '16021';

//   constructor(
//     ipAddress: string,
//     apiVersion: string,
//     authToken: string,
//     port: string
//   ) {
//     this._ipAddress = ipAddress;
//     this._apiVersion = apiVersion;
//     this._authToken = authToken;
//     this._port = port;
//   }

//   public get ipAddress(): string {
//     return this._ipAddress;
//   }

//   public get apiVersion(): string {
//     return this._apiVersion;
//   }

//   public get authToken(): string {
//     return this._authToken;
//   }

//   public get port(): string {
//     return this._port;
//   }
// }

function provideUserDataDefaults(ud: NanoleafProperties) {
  let newUserData = { ...ud };
  if (!newUserData.apiVersion) newUserData.apiVersion = '/api/v1/';
  if (!newUserData.port) newUserData.port = '16021';

  return newUserData;
}

export class Nanoleaf {
  private _userData: NanoleafProperties;
  private _baseURL: string;
  private _state: State;
  private _effects: Effects;
  private _layout: Layout;
  private _rhythm: Rhythm;
  private _panels: Panels;

  constructor(userData: NanoleafProperties) {
    this._userData = provideUserDataDefaults(userData);
    this._baseURL = `http://${this._userData.ipAddress}:${this._userData.port}${this._userData.apiVersion}${this._userData.authToken}`;
    this._state = new State(this._baseURL);
    this._effects = new Effects(this._baseURL);
    this._layout = new Layout(this._baseURL);
    this._rhythm = new Rhythm(this._baseURL);
    this._panels = new Panels(this._baseURL);
  }

  public controllerInfo = async (): Promise<NanoleafAttributes> => {
    try {
      const info = await Request.get<NanoleafAttributes>(this._baseURL);
      return info;
    } catch (err) {
      throw err;
    }
  };

  public get state(): State {
    return this._state;
  }

  public get effects(): Effects {
    return this._effects;
  }

  public get layout(): Layout {
    return this._layout;
  }

  public get panels(): Panels {
    return this._panels;
  }

  public get rhythm(): Rhythm {
    return this._rhythm;
  }
}
