# nanoleaf-ts

nanoleaf-ts is a package that makes interacting with your Nanoleaf Aurora more pleasant 😄

It provides a simple abstraction layer over the Aurora's local-network REST API.

## Features

- All available interactions with the Nanoleaf Aurora
- Entirely promise based
- Written in TypeScript
- No dependencies
- Full test suite

## Installation

WIP

## Getting an Auth Token

In order to use nanoleaf-ts, you'll need to acquire an authorization token for your Aurora. Please take a look at [Nanoleaf's documentation](https://documenter.getpostman.com/view/1559645/RW1gEcCH?version=latest#edd41442-c94f-49dc-977b-8180be92e018) to get started.

## Let's See Some Code

Here's an example in TypeScript showing how to check if your Aurora is on or off:

```typescript
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
```

Note that this example is loading the IP address, port, and authToken from the environment. This is not required but strongly suggested.

## Documentation

nanoleaf-ts is composed of six main classes:

- `nanoleaf` - exposes everything below
- `state` - brightness, hue, on/off, etc.
- `effects` - set current effect, get list of available effects, etc.
- `layout` - general panel layout information
- `panels` - identification functionality
- `rhythm` - accessing rhythm module properties

### Creating the Nanoleaf Object

To start working with the package, create a nanoleaf object similarly to what is shown below.

Pass in the IP address, API version, port, and auth token as strings.

```typescript
import Nanoleaf from './nanoleaf';

let nanoleaf = new Nanoleaf({
  ipAddress: '192.168.1.200', // you can check your router page to find your Aurora's IP
  apiVersion: '/api/v1/', // you can leave this as is
  port: '16021', // this is the standard port
  authToken: 'myAuthToken', // you can get this by taking a look at the 'Getting an Auth Token` section
});
```

#### Top-Level Functions

`controllerInfo = async (): Promise<NanoleafAttributes>` - Returns general info about the Aurora controller.

### State

```typescript
import Nanoleaf from './nanoleaf';

let nanoleaf = new Nanoleaf({
    ...
});

let state = nanoleaf.state;
```

#### State Functions

`isTurnedOn = async (): Promise<boolean>` - Returns `true` if the Aurora is turned on and `false` if it is off

`toggleOnOffState = async (): Promise<boolean>` - Toggles the Aurora to the opposite on/off state

`getBrightness = async (): Promise<LightValues>` - Get the currently set brightness

`getHue = async (): Promise<LightValues>` - Get the currently set Hue

`getSaturation = async (): Promise<LightValues>` - Get the currently set saturation

`getColorTemperature = async (): Promise<LightValues>` - Get the currently set color temperature

`getColorMode = async (): Promise<string>` - Get the currently set color mode

`setBrightness = async (value: number, duration?: number): Promise<void>` - Set the brightness

Arguments:

- `value` - integer between 0 and 100
- `duration` - (optional) duration in seconds

`setHue = async (value: number): Promise<void>` - Set the hue

Arguments:

- `value` - integer between 0 and 360

`setSaturation = async (value: number): Promise<void>` - Set the saturation

Arguments:

- `value` - integer between 0 and 100

`setColorTemperature = async (value: number): Promise<void>` - Set the color temperature

Arguments:

- `value` - integer between 1200 and 6500

#### Effects Functions

`getCurrent = async (): Promise<string>` - Get current effect

`getFullList = async (): Promise<string[]>` - Get array of all available effects

`setCurrent = async (effectName: string): Promise<void>` - Set the current effect

Arguments:

- `effectName` - a valid effect name

`public setWrite = async ( command: string, animName: string ): Promise<WriteResponse>` - Writes an animation? (not a ton of documentation around this: [https://documenter.getpostman.com/view/1559645/RW1gEcCH?version=latest#bff185d5-ad6f-4bef-84b6-70cadfa92e20](https://documenter.getpostman.com/view/1559645/RW1gEcCH?version=latest#bff185d5-ad6f-4bef-84b6-70cadfa92e20))

Arguments:

- `command` - type of command?
- `animName` - name of animation?

#### Layout Functions

`public getGlobalOrientation = async (): Promise<LightValues>` - Get the global orientation of the Aurora

`setGlobalOrientation = async (value: number): Promise<void>` - Set the global orientation of the Aurora

Arguments:

- `value` - valid integer (not much documentation around this: [https://documenter.getpostman.com/view/1559645/RW1gEcCH?version=latest#064d0e64-26fd-4cd5-99d6-d7ab68a3c66e](https://documenter.getpostman.com/view/1559645/RW1gEcCH?version=latest#064d0e64-26fd-4cd5-99d6-d7ab68a3c66e))

`getLayout = async (): Promise<LayoutValue>` - Get the current panel layout

#### Panels Functions

`public identify = async (): Promise<void>` - Identifies the connected Aurora by flashing the panels

#### Rhythm Functions

`public isConnected = async (): Promise<boolean>` - Returns true if the rhythm module is connected

`public isActive = async (): Promise<boolean>` - Returns true if the rhythm module is being used

`public getId = async (): Promise<number>` - Returns the ID of the rhythm module

`public getHardwareVersion = async (): Promise<string>` - Returns the rhythm module hardware version

`public getFirmwareVersion = async (): Promise<string>` - Returns the rhythm module firmware version

`public isAuxAvailable = async (): Promise<boolean>` - Returns true if an auxiliary port is connected to the rhythm module

`public getMode = async (): Promise<number>` - Get the current rhythm mode

`public getPositions = async (): Promise<PositionData>` - Get the position and orientation of the rhythm module in the light panels layout

`public setMode = async (mode: number = 0): Promise<void>` - Set the current rhythm mode (microphone sound source or aux cable sound source)

Arguments:

- `mode` - 0 for microphone source, 1 for aux cable
