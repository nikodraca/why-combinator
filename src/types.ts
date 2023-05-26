export interface Company {
  name: string;
  description: string;
  img: string;
  real: boolean;
}

export interface Game {
  index: number;
  companies: Array<Company>;
  score: number;
}
