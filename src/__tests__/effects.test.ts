import { Nanoleaf } from '../nanoleaf';
import Request from '../request';
import { mocked } from 'ts-jest/utils';

// mock request module
jest.mock('../request');
const mockedRequest = mocked(Request, true);

let effects = new Nanoleaf({
  ipAddress: '192.fake.ip',
  apiVersion: '/api/v1/',
  port: '99999',
  authToken: 'fakeAuthToken',
}).effects;

jest.mock('../');

describe('Nanoleaf effects', () => {
  test('Should return current set effect', async () => {
    mockedRequest.get.mockResolvedValue('Nemo');
    let currentEffect = await effects.getCurrent();
    expect(currentEffect).toEqual('Nemo');
  });

  test('Should get full list of effects', async () => {
    mockedRequest.get.mockResolvedValue([
      'Nemo',
      'OtherNemo',
      'ExampleEffect',
      'Weather',
    ]);
    let effectList = await effects.getFullList();
    expect(effectList).toHaveLength(4);
    expect(effectList).toContain('OtherNemo');
  });

  test('Should throw error when effectName is empty', async () => {
    await expect(effects.setCurrent('')).rejects.toThrow();
  });

  test('Should throw error when effectName does not exist', async () => {
    mockedRequest.get.mockResolvedValue([
      'Nemo',
      'OtherNemo',
      'ExampleEffect',
      'Weather',
    ]);
    await expect(effects.setCurrent('NameIsntHere')).rejects.toThrow(
      'does not exist'
    );
  });

  test('Should throw error when either/both arguments are empty', async () => {
    await expect(effects.setWrite('', 'ok')).rejects.toThrow('cannot be empty');
    await expect(effects.setWrite('ok', '')).rejects.toThrow('cannot be empty');
    await expect(effects.setWrite('', '')).rejects.toThrow('cannot be empty');
  });

  test('Should throw error when animation name does not exist in the list', async () => {
    mockedRequest.get.mockResolvedValue([
      'Nemo',
      'OtherNemo',
      'ExampleEffect',
      'Weather',
    ]);
    await expect(
      effects.setWrite('test', 'animNameDoesntExist')
    ).rejects.toThrow('does not exist');
  });

  test('Should get response when calling setWrite', async () => {
    mockedRequest.get.mockResolvedValue(['Northern Lights', 'Other', 'Other2']);
    mockedRequest.put.mockResolvedValue({
      animName: 'Northern Lights',
      loop: true,
      palette: [
        {
          hue: 227,
          saturation: 100,
          brightness: 99,
        },
      ],
      version: '1.0',
      transTime: {
        maxValue: 20,
        minValue: 20,
      },
      windowSize: 2,
      flowFactor: 0,
      delayTime: {
        maxValue: 20,
        minValue: 5,
      },
      colorType: 'HSB',
      animType: 'wheel',
      explodeFactor: 0,
      brightnessRange: {
        maxValue: 0,
        minValue: 0,
      },
      direction: 'right',
    });
    let response = await effects.setWrite('request', 'Northern Lights');
    expect(response).toHaveProperty('animName');
    expect(response).toHaveProperty('direction');
    expect(response).toHaveProperty('direction', 'right');
  });
});
