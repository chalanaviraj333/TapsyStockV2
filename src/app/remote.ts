import { Car } from './car';

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
  notes?: string;
  remoteinStock: boolean;
  compitablecars?: Array<Car>;
  compitablebrands: Array<string>;
}
