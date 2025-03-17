import { useQuery } from '@tanstack/react-query';
import UIDB from './uidb.json';

export interface DeviceLine {
  id: string;
  name: string;
}

interface DeviceProduct {
  abbrev: string;
  name: string;
}

interface DeviceIcons {
  id: string;
  resolutions: [number, number][];
}

export interface Device {
  id: string;
  line?: DeviceLine;
  product?: DeviceProduct;
  shortnames?: string[];
  icon?: DeviceIcons
  sku?: string;
  maxPower?: number;
  maxSpeed?: number;
  numberOfPorts?: number;
  json: string;
}

// devices data is valid if it is an object containing a devices array, each of which is an object
// with at least an id of type string. Validating all other properties of devices must be done
// in the UI, as the structure of the device data is unknown.
interface ValidDevice {
  id: string;
  line: unknown;
  product: unknown;
  shortnames: unknown;
  icon: unknown;
  sku: unknown;
  unifi: unknown;
}


interface ValidDevicesResponse {
  devices: ValidDevice[];
}

const isValidDeviceData = (device: unknown): device is ValidDevice => {
  return !!(
    device &&
    typeof device === 'object' &&
    'id' in device &&
    typeof device.id === 'string'
  );
};

const isValidDevicesData = (data: unknown): data is ValidDevicesResponse => {
  return !!(
    data &&
    typeof data === 'object' &&
    'devices' in data &&
    Array.isArray(data.devices) &&
    data.devices.every((device) => isValidDeviceData(device))
  );
};

const normalizeDevice = (device: ValidDevice): Device => {
  const line = (
    device.line &&
    typeof device.line === 'object' &&
    'id' in device.line &&
    typeof device.line.id === 'string' &&
    'name' in device.line &&
    typeof device.line.name === 'string'
  ) ? device.line as DeviceLine : undefined;

  const product = (
    device.product &&
    typeof device.product === 'object' &&
    'name' in device.product &&
    typeof device.product.name === 'string' &&
    'abbrev' in device.product &&
    typeof device.product.abbrev === 'string'
  ) ? device.product as DeviceProduct : undefined;

  const shortnames = (
    device.shortnames &&
    Array.isArray(device.shortnames) &&
    device.shortnames.every((shortname) => typeof shortname === 'string')
  ) ? device.shortnames : undefined;

  const icon = (
    device.icon &&
    typeof device.icon === 'object' &&
    'id' in device.icon &&
    typeof device.icon.id === 'string' &&
    'resolutions' in device.icon &&
    Array.isArray(device.icon.resolutions) &&
    device.icon.resolutions.every((resolution) => {
      return Array.isArray(resolution) && resolution.length === 2 && resolution.every((value) => typeof value === 'number');
    })
  ) ? device.icon as DeviceIcons : undefined;

  const sku = device.sku ? device.sku as string : undefined;

  const unifiNetwork = (
    device.unifi &&
    typeof device.unifi === 'object' &&
    'network' in device.unifi &&
    typeof device.unifi.network === 'object'
  ) ? device.unifi.network : undefined;

  const radios = (
    unifiNetwork &&
    'radios' in unifiNetwork &&
    typeof unifiNetwork.radios === 'object'
  ) ? unifiNetwork.radios : undefined;

  const maxPowers: number[] = radios ?
    (Object.values(radios).map((radio: unknown) => {
      return ((
        radio &&
        typeof radio === 'object' &&
        'maxPower' in radio &&
        typeof radio.maxPower === 'number'
      ) ? radio.maxPower : undefined);
    }).filter(maxPower => typeof maxPower === 'number')) :
    [];

  const maxPower = maxPowers.length > 0 ? Math.max(...maxPowers) : undefined;

  const maxSpeeds: number[] = radios ?
    (Object.values(radios).map((radio: unknown) => {
      return ((
        radio &&
        typeof radio === 'object' &&
        'maxSpeedMegabitsPerSecond' in radio &&
        typeof radio.maxSpeedMegabitsPerSecond === 'number'
      ) ? radio.maxSpeedMegabitsPerSecond : undefined);
    }).filter(maxSpeedMegabitsPerSecond => typeof maxSpeedMegabitsPerSecond === 'number')) :
    [];

  const maxSpeed = maxSpeeds.length > 0 ? Math.max(...maxSpeeds) : undefined;

  const numberOfPorts = (
    unifiNetwork &&
    'numberOfPorts' in unifiNetwork &&
    typeof unifiNetwork.numberOfPorts === 'number'
  ) ? unifiNetwork.numberOfPorts : undefined;

  return {
    id: device.id,
    line,
    product,
    shortnames,
    icon,
    sku,
    maxPower,
    maxSpeed,
    numberOfPorts,
    json: JSON.stringify(device),
  };
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const useDevicesQuery = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      // add a delay to simulate network latency
      await delay(100);

      if (!isValidDevicesData(UIDB)) {
        throw new Error('Invalid data');
      }

      return {
        devices: UIDB.devices.map(normalizeDevice),
      };
    },
  });
};

export default useDevicesQuery;
