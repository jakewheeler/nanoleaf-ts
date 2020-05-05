import Request from '../request';
import { mocked } from 'ts-jest/utils';
import { Nanoleaf } from '../nanoleaf';

jest.mock('../request');
const mockedRequest = mocked(Request, true);

const panels = new Nanoleaf({
  ipAddress: '192.168.1.19',
  apiVersion: '/api/v1/',
  port: '50595!',
  authToken: 'randomAuthToken',
}).panels;

describe('Panels', () => {
  test('Should identify panels', async () => {
    mockedRequest.put.mockResolvedValue('');
    panels.identify();
  });
});
