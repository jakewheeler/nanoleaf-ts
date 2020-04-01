import axios from 'axios';
import { Effect } from './interfaces/Nanoleaf.interfaces';

export class Effects {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/effects`;
  }

  public getSelect = async (): Promise<string> => {
    try {
      const selectUrl = `${this.url}/select`;
      const response = await axios.get<string>(selectUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public getList = async (): Promise<string[]> => {
    try {
      const listUrl = `${this.url}/effectsList`;
      const response = await axios.get<string[]>(listUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}
