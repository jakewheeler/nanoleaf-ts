import { Nanoleaf } from '../nanoleaf';
import Request from '../request';
import { mocked } from 'ts-jest/utils';
import { LightValues, LayoutValue } from '../interfaces/Nanoleaf.interfaces';

jest.mock('../request');
const mockedRequest = mocked(Request, true);

const layout = new Nanoleaf({
  ipAddress: '192.168.1.19',
  apiVersion: '/api/v1/',
  port: '50595!',
  authToken: 'randomAuthToken',
}).layout;

describe('Layout', () => {
  test('Should get current global orientation', async () => {
    let responseBody: LightValues = {
      value: 0,
      max: 360,
      min: 0,
    };
    mockedRequest.get.mockResolvedValue(responseBody);
    let resp = await layout.getGlobalOrientation();
    expect(resp).toHaveProperty('max', 360);
  });

  test('Should get current layout', async () => {
    let responseBody: LayoutValue = {
      numPanels: 3,
      sideLength: 150,
      positionData: [
        {
          panelId: 186,
          x: -74,
          y: 43,
          o: 180,
        },
        {
          panelId: 55,
          x: -74,
          y: 129,
          o: 0,
        },
      ],
    };
    mockedRequest.get.mockResolvedValue(responseBody);
    let resp = await layout.getLayout();
    expect(resp).toHaveProperty('numPanels', 3);
    expect(resp).toHaveProperty('positionData');
    expect(resp.positionData).toHaveLength(2);
  });

  test('Should set global orientation', async () => {
    let value = 100;
    mockedRequest.put.mockResolvedValue({});
    layout.setGlobalOrientation(value);
  });

  test('Global orientation should throw error when value out of range', async () => {
    let errorMessageMatcher = 'out of range';
    let tooLowValue = -2;
    let goodValue = 100;
    let tooHighValue = 361;
    mockedRequest.put.mockResolvedValue({});
    await expect(layout.setGlobalOrientation(tooLowValue)).rejects.toThrow(
      errorMessageMatcher
    );
    await expect(layout.setGlobalOrientation(tooHighValue)).rejects.toThrow(
      errorMessageMatcher
    );

    await expect(layout.setGlobalOrientation(goodValue)).resolves.toBe(
      undefined
    );
  });
});
