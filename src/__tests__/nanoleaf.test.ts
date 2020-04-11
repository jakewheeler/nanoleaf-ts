import Nanoleaf from '../nanoleaf';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');

const nanoleaf = new Nanoleaf({
  ipAddress: '192.168.1.19',
  apiVersion: '/api/v1/',
  port: '50595!',
  authToken: 'randomAuthToken',
});

describe('Nanoleaf', () => {
  it('should fetch Nanoleaf controller information', async () => {
    const response = {
      data: {
        name: 'light panels',
        serialNo: 'fje8383',
        effects: {
          effectsList: ['test1', 'test2', 'test3'],
          select: 'test2',
        },
      },
    };

    mocked(axios.get).mockReturnValueOnce({ data: response } as any);
    const result = await nanoleaf.controllerInfo();
    expect(axios.get).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
