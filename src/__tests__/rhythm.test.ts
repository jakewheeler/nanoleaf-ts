import Nanoleaf from '../nanoleaf';
import Request from '../request';
import { mocked } from 'ts-jest/utils';

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
});
