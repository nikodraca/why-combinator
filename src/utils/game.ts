import { onCleanup } from "solid-js";
import { sampleSize } from "lodash";

import data from "../data.json";
import { Company, Game } from "../types";

const getRandomCompanies = (n = 5): Array<Company> => {
  const fakeCompanies = data.filter((c) => !c.real);
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

export const preloadImages = (
  images: Array<string>,
  onComplete: () => void
) => {
  let loadedCount = 0;

  const loadImage = (src: string) => {
    const imageLoader = new Image();

    imageLoader.src = src;
    console.log({ src });

    imageLoader.onload = () => {
      console.log(src + " LOADED");
      loadedCount++;
      if (loadedCount === images.length) {
        onComplete();
      }
    };
  };

  images.forEach((src) => {
    loadImage(src);
  });
};
