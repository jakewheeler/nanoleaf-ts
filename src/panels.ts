import Request from './request';

export class Panels {
  private _url: string;

  constructor(url: string) {
    this._url = `${url}/identify`;
  }

  public identify = async (): Promise<void> => {
    try {
      await Request.put(this._url);
    } catch (err) {
      throw err;
    }
  };
}
