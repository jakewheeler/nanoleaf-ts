import Nanoleaf from './Nanoleaf';
import { config } from 'dotenv';

config();

const main = async (): Promise<void> => {
  let nanoleaf = new Nanoleaf({
    ipAddress: process.env.ALEX_ADDRESS!,
    apiVersion: '/api/v1/',
    port: process.env.PORT!,
    authToken: process.env.ALEX_TOKEN!
  });

  await nanoleaf.state.toggleOnOffState();
};

main();
