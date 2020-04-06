import axios from 'axios';

export default class Effects {
  private url: string;

  constructor(url: string) {
    this.url = `${url}/effects`;
  }

  public getCurrent = async (): Promise<string> => {
    try {
      const selectUrl = `${this.url}/select`;
      const response = await axios.get<string>(selectUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public getFullList = async (): Promise<string[]> => {
    try {
      const listUrl = `${this.url}/effectsList`;
      const response = await axios.get<string[]>(listUrl);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  public setCurrent = async (effectName: string): Promise<void> => {
    try {
      if (effectName === '') throw new Error('An effectName is required');
      if (!(await this.effectExists(effectName)))
        throw new Error(
          `Effect with name "${effectName}" does not exist. Check for capitilization errors.`
        );

      const body = {
        select: effectName
      };
      await axios.put(this.url, body);
    } catch (err) {
      throw err;
    }
  };

  // TODO:
  // Add write for list

  private effectExists = async (effectName: string): Promise<boolean> => {
    try {
      const effectList = await this.getFullList();

      return effectList.includes(effectName);
    } catch (err) {
      throw err;
    }
  };
}
