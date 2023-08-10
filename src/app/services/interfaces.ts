export interface Searching {
  value: string;
  date: number;
}

export interface SearchList {
  [key: string]: number[];
}

export interface LastSearch {
  [key: string]: number;
}

export interface Search {
  value: string;
  date: number[];
}
