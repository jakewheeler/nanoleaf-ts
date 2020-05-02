import Nanoleaf from '../nanoleaf';
import Request from '../request';
import { mocked } from 'ts-jest/utils';
import { PositionData } from '../interfaces/Nanoleaf.interfaces';

jest.mock('../request');
const mockedRequest = mocked(Request, true);

const rhythm = new Nanoleaf({
  ipAddress: '192.168.1.19',
  apiVersion: '/api/v1/',
  port: '50595',
  authToken: 'randomAuthToken',
}).rhythm;

describe('Rhythm', () => {
  test('Should return whether or not rhythm device is connected', async () => {
    mockedRequest.get.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    let connected = await rhythm.isConnected();
    expect(connected).toEqual(true);
    connected = await rhythm.isConnected();
    expect(connected).toEqual(false);
  });

  test('Should return whether or not rhythm device is active', async () => {
    mockedRequest.get.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    let connected = await rhythm.isActive();
    expect(connected).toEqual(true);
    connected = await rhythm.isActive();
    expect(connected).toEqual(false);
  });

  test('Should return rhythm ID', async () => {
    mockedRequest.get.mockResolvedValue(19);
    let id = await rhythm.getId();
    expect(id).toEqual(19);
  });

  // this is useful because this pattern is followed throughout the rest of the code base
  test('Should handle error being thrown', async () => {
    let e = new Error('rip');
    mockedRequest.get.mockResolvedValue(e);
    let id: number = await rhythm.getId();
    expect(id).toBe(e);
  });

  test('Should get rhythm hardware version', async () => {
    let version = '1.0.0';
    mockedRequest.get.mockResolvedValue(version);
    let resp = await rhythm.getHardwareVersion();
    expect(resp).toEqual(version);
  });

  test('Should get rhythm firmware version', async () => {
    let version = '2.0.0';
    mockedRequest.get.mockResolvedValue(version);
    let resp = await rhythm.getFirmwareVersion();
    expect(resp).toEqual(version);
  });

  test('Should return true if aux is available', async () => {
    mockedRequest.get.mockResolvedValue(true);
    let resp = await rhythm.isAuxAvailable();
    expect(resp).toEqual(true);
  });

  test('Should return mode as 0', async () => {
    let mode = 0;
    mockedRequest.get.mockResolvedValue(0);
    let resp = await rhythm.getMode();
    expect(resp).toEqual(mode);
  });

  test('Should return position data', async () => {
    let posData: PositionData = {
      o: 909,
      x: 101,
      y: 202,
    };
    mockedRequest.get.mockResolvedValue(posData);
    let resp = await rhythm.getPositions();
    expect(resp).toEqual(posData);
  });

  test('Should be able to set mode only to 0 or 1', async () => {
    // throws error if not 0 or 1
    let errorMessageShouldInclude = '0 for "microphone"';
    await expect(rhythm.setMode(-1)).rejects.toThrow(errorMessageShouldInclude);
    await expect(rhythm.setMode(2)).rejects.toThrow(errorMessageShouldInclude);

    // should resolve
    mockedRequest.put.mockResolvedValue(undefined);
    await expect(rhythm.setMode(0)).resolves.toEqual(undefined);
    await expect(rhythm.setMode(1)).resolves.toEqual(undefined);
  });
});
