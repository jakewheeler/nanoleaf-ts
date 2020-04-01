import axios from 'axios';
import {
  NanoleafProperties,
  NanoleafAttributes
} from './interfaces/Nanoleaf.interfaces';
import { State } from './state';
import { Effects } from './effects';
import { Layout } from './layout';
import { Rhythm } from './rhythm';

class Nanoleaf {
  private userData: NanoleafProperties;
  private baseURL: string;
  private nState: State;
  private nEffects: Effects;
  private nLayout: Layout;
  private nRhythm: Rhythm;

  constructor(userData: NanoleafProperties) {
    this.userData = userData;
    this.baseURL = `http://${this.userData.ipAddress}:${this.userData.port}${this.userData.apiVersion}${this.userData.authToken}`;
    this.nState = new State(this.baseURL);
    this.nEffects = new Effects(this.baseURL);
    this.nLayout = new Layout(this.baseURL);
    this.nRhythm = new Rhythm(this.baseURL);
  }

  public controllerInfo = async (): Promise<NanoleafAttributes> => {
    try {
      const controllerInfo = await axios.get<NanoleafAttributes>(this.baseURL);
      const info = controllerInfo.data;
      return info;
    } catch (err) {
      throw err;
    }
  };

  public get state(): State {
    return this.nState;
  }

  public get effects(): Effects {
    return this.nEffects;
  }

  public get layout(): Layout {
    return this.nLayout;
  }

  public get rhythm(): Rhythm {
    return this.nRhythm;
  }
}

export default Nanoleaf;
