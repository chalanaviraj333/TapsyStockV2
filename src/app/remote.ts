import { Car } from './car';
import { RemoteNote } from './remote-note';

export interface Remote {
  key: string;
  tapsycode: string;
  boxnumber: number;
  inbuildchip?: string;
  inbuildblade?: string;
  battery?: string;
  buttons?: number;
  frequency?: string;
  costperitem?: number;
  remotetype?: string;
  image?: string;
  notes?: Array<RemoteNote>;
  remoteinStock: boolean;
  qtyavailable?: number;
  compitablecars?: Array<Car>;
  compitablebrands: Array<string>;
}
