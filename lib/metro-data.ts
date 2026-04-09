export interface Station {
  name: string;
  transfers?: string[];
}

export interface MetroLine {
  id: string;
  name: string;
  color: string;
  terminals: [string, string];
  stations: Station[];
}

export { metroLines } from "./data-adapter";
