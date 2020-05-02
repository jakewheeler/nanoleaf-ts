import Nanoleaf from './nanoleaf';
import { config } from 'dotenv';

config();

(async (): Promise<void> => {
  let nanoleaf = new Nanoleaf({
    ipAddress: process.env.IP_ADDRESS!,
    apiVersion: '/api/v1/',
    port: process.env.PORT!,
    authToken: process.env.AUTH_TOKEN!,
  });

  try {
    let isOn = await nanoleaf.state.isTurnedOn();
    console.log(isOn);
  } catch (err) {
    console.log(err);
  }
})();
