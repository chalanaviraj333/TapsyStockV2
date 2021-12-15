import { RemoteNote } from "../remote-note";

export interface GarageRemote {
    key: string;
    tapsycode: string;
    boxnumber: number;
    shell: string;
    frequency: string;
    compatibleBrand: string;
    productType: string;
    qtyavailable: number;
    image: string;
    notes: Array<RemoteNote>;
    compatibleModels: Array<string>;
}
