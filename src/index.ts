import Nanoleaf from './nanoleaf';
import { config } from 'dotenv';

config();

const main = async (): Promise<void> => {
  let nanoleaf = new Nanoleaf({
    ipAddress: process.env.IP_ADDRESS!,
    apiVersion: '/api/v1/',
    port: process.env.PORT!,
    authToken: process.env.AUTH_TOKEN!
  });

  let f = await nanoleaf.state.brightness();
  console.log(f);
};

main();
