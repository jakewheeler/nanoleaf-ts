import Nanoleaf from '../nanoleaf';
import Request from '../request';
import { mocked } from 'ts-jest/utils';
import { LightValues } from '../interfaces/Nanoleaf.interfaces';

jest.mock('../request');
const mockedRequest = mocked(Request, true);

const state = new Nanoleaf({
  ipAddress: '192.168.1.19',
  apiVersion: '/api/v1/',
  port: '50595!',
  authToken: 'randomAuthToken',
}).state;

describe('State', () => {
  test('Should return true if Aurora is turned on', async () => {
    mockedRequest.get.mockResolvedValue({ value: true });
    let response = await state.isTurnedOn();
    expect(response).toEqual(true);
  });

  test('Should toggle to the opposite state', async () => {
    // start true
    mockedRequest.get.mockResolvedValue({ value: true });
    let newState = await state.toggleOnOffState();
    expect(newState).toEqual(false); // should be off

    mockedRequest.get.mockResolvedValue({ value: false });
    newState = await state.toggleOnOffState();
    expect(newState).toEqual(true); // should be turned on again
  });

  test('Should get brightness values', async () => {
    let brightness: LightValues = {
      value: 100,
      max: 100,
      min: 0,
    };
    mockedRequest.get.mockResolvedValue(brightness);
    let response = await state.getBrightness();
    expect(response).toBe(brightness);
    expect(response).toHaveProperty('min', 0);
  });

  test('Should throw error when provided brightness value is out of range', async () => {
    await expect(state.setBrightness(101)).rejects.toThrow(
      'value out of range'
    );
    await expect(state.setBrightness(-20)).rejects.toThrow(
      'value out of range'
    );
    await expect(state.setBrightness(99)).resolves.toBe(undefined);
  });

  test('Should throw error when provided hue value is out of range', async () => {
    await expect(state.setHue(370)).rejects.toThrow('value out of range');
    await expect(state.setHue(-1)).rejects.toThrow('value out of range');
    await expect(state.setHue(99)).resolves.toBe(undefined);
  });

  test('Should throw error when provided saturation value is out of range', async () => {
    await expect(state.setSaturation(370)).rejects.toThrow(
      'value out of range'
    );
    await expect(state.setSaturation(-1)).rejects.toThrow('value out of range');
    await expect(state.setSaturation(99)).resolves.toBe(undefined);
  });

  test('Should throw error when provided color temperate value is out of range', async () => {
    await expect(state.setColorTemperature(6501)).rejects.toThrow(
      'value out of range'
    );
    await expect(state.setColorTemperature(-1)).rejects.toThrow(
      'value out of range'
    );
    await expect(state.setColorTemperature(1202)).resolves.toBe(undefined);
  });

  test('Should get hue values', async () => {
    let hue: LightValues = {
      value: 0,
      max: 360,
      min: 0,
    };
    mockedRequest.get.mockResolvedValue(hue);
    let response = await state.getHue();
    expect(response).toBe(hue);
    expect(response).toHaveProperty('max', 360);
  });

  test('Should get saturation values', async () => {
    let sat: LightValues = {
      value: 0,
      max: 100,
      min: 0,
    };
    mockedRequest.get.mockResolvedValue(sat);
    let response = await state.getSaturation();
    expect(response).toBe(sat);
    expect(response).toHaveProperty('max', 100);
  });

  test('Should get color temperature', async () => {
    let colorTemp: LightValues = {
      value: 4000,
      max: 6500,
      min: 1200,
    };
    mockedRequest.get.mockResolvedValue(colorTemp);
    let response = await state.getColorTemperature();
    expect(response).toBe(colorTemp);
    expect(response).toHaveProperty('max', 6500);
  });

  test('Should get color mode', async () => {
    let colorMode = 'ct';
    mockedRequest.get.mockResolvedValue(colorMode);
    let response = await state.getColorMode();
    expect(response).toEqual(colorMode);
  });
});
