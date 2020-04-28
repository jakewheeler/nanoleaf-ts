import Nanoleaf from '../nanoleaf';
import Request from '../request';
import { mocked } from 'ts-jest/utils';

jest.mock('../request');
const mockedRequest = mocked(Request, true);

const nanoleaf = new Nanoleaf({
  ipAddress: '192.168.1.19',
  apiVersion: '/api/v1/',
  port: '50595!',
  authToken: 'randomAuthToken',
});

mockedRequest.get.mockResolvedValue({
  name: 'My Lights',
  serialNo: '5506950',
  manufacturer: 'Nanoleaf',
  firmwareVersion: '3.3.3',
  hardwareVersion: '1.6-2',
  model: 'NL22',
  cloudHash: {},
  discovery: {},
  effects: {
    effectsList: ['idk', 'myeffect', 'sure'],
    select: 'Nemo',
  },
  firmwareUpgrade: {},
  panelLayout: {
    globalOrientation: { value: 359, max: 360, min: 0 },
    layout: { numPanels: 9, sideLength: 150, positionData: [Array] },
  },
  rhythm: {
    auxAvailable: false,
    firmwareVersion: '2.4.3',
    hardwareVersion: '1.4',
    rhythmActive: false,
    rhythmConnected: true,
    rhythmId: 51,
    rhythmMode: 1,
    rhythmPos: { x: 149.99708295586754, y: 389.7080855022063, o: 120 },
  },
  schedules: {},
  state: {
    brightness: { value: 48, max: 100, min: 0 },
    colorMode: 'effect',
    ct: { value: 1250, max: 6500, min: 1200 },
    hue: { value: 0, max: 360, min: 0 },
    on: { value: true },
    sat: { value: 0, max: 100, min: 0 },
  },
});

describe('Nanoleaf', () => {
  test('Should get correct controller info', async () => {
    let fn = await nanoleaf.controllerInfo();

    // mock is called
    expect(mockedRequest.get.mockImplementation()).toHaveBeenCalledTimes(1);

    // check that API looks as expected
    expect(fn).toHaveProperty('state.sat');
    expect(fn).toHaveProperty('model');
    expect(fn).toHaveProperty('effects.effectsList');
  });
});
