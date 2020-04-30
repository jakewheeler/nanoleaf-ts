import Nanoleaf from '../nanoleaf';
import Request from '../request';
import { mocked } from 'ts-jest/utils';

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
});
