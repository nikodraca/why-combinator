import { sampleSize } from "lodash";

import data from "../data.json";
import { Company, Game } from "../types";

const getRandomCompanies = (n = 5): Array<Company> => {
  const fakeCompanies = data.filter((c) => !c.real);
  console.log(fakeCompanies.length);
  const realCompanies = sampleSize(
    data.filter((c) => !!c.real),
    fakeCompanies.length
  );

  const allCompanies = [...fakeCompanies, ...realCompanies];

  return sampleSize(allCompanies, n) as Array<Company>;
};

export const createNewGame = (): Game => {
  return {
    index: 0,
    companies: getRandomCompanies(5),
    score: 0
  };
};
