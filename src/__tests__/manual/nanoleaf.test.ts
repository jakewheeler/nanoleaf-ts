import { Nanoleaf } from '../../nanoleaf';
import { config } from 'dotenv';

config();

describe.skip('Integration tests against local Nanoleaf Aurora', () => {
  let nanoleaf: Nanoleaf;
  beforeEach(() => {
    nanoleaf = new Nanoleaf({
      ipAddress: process.env.IP_ADDRESS!,
      authToken: process.env.AUTH_TOKEN!,
    });
  });

  test('Should complete successful GET request', async () => {
    await expect(nanoleaf.controllerInfo()).resolves.toHaveProperty('effects');
  });

  test('Should complete successful PUT request', async () => {
    // current state
    let onState = await nanoleaf.state.isTurnedOn();

    // actual request to test
    await nanoleaf.state.toggleOnOffState();

    // state after toggling
    let newOnState = await nanoleaf.state.isTurnedOn();

    // set back to original state
    await nanoleaf.state.toggleOnOffState();

    expect(newOnState).toEqual(!onState);
  });

  test('Should get auth token', async () => {});
});
