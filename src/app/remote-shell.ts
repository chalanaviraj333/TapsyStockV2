import { Car } from "./car";

export interface RemoteShell {
  key: string;
  tapsycode: string;
  boxnumber: number;
  remotetype?: string;
  compitablebrands?: Array<string>;
  image: string;
  blade: string;
  buttons: string
  notes: string;
  inStock?: boolean;
  compitablecars?: Array<Car>;
  qtyAvailable?: number;
}
