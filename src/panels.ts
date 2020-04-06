import axios from 'axios';

export default class Panels {
  private _url: string;

  constructor(url: string) {
    this._url = `${url}/identify`;
  }

  public identify = async () => {
    try {
      await axios.put(this._url);
    } catch (err) {
      throw err;
    }
  };
}
