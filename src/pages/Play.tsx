import {
  Accessor,
  Component,
  Show,
  createEffect,
  createSignal
} from "solid-js";
import { A } from "@solidjs/router";
import { sample } from "lodash";

import {
  Button,
  ButtonType,
  Container,
  Header,
  Main,
  ProgressBar,
  CurrentCompany,
  GameOver
} from "../components";
import { createNewGame, preloadImages } from "../utils/game";
import { Company } from "../types";
import { LOADING_COPY, RESULTS } from "../constants";

export const Play: Component = () => {
  const [game, setGame] = createSignal(createNewGame());
  const [isGameOver, setIsGameOver] = createSignal(false);
  const [currentCompany, setCurrentCompany] = createSignal<Company>();
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [endGameCopy, setEndGameCopy] = createSignal("");

  createEffect(() => {
    const gameOver = game().index === game().companies.length;

    setIsGameOver(gameOver);

    if (!!gameOver) {
      const endCopy = sample(RESULTS[game().score]);
      setEndGameCopy(endCopy!);
    }
  });

  createEffect(() => {
    setCurrentCompany(game()?.companies[game().index]);
  });

  createEffect(() => {
    // Preload images so there isn't a lag when progressing
    // This should probably be in CDN but I'm lazy
    if (!isLoaded()) {
      const handlePreloadComplete = () => {
        setIsLoaded(true);
      };

      const images = game().companies.map(({ img }) => img);
      preloadImages(images, handlePreloadComplete);
    }
  });

  const handleNext = (isReal: boolean) => {
    const newScore =
      currentCompany()?.real === isReal ? game().score + 1 : game().score;
    const newIndex = game().index + 1;

    setGame({ ...game(), index: newIndex, score: newScore });
  };

  const gamePct = () => game().index / game().companies.length;

  const handleNewGame = () => {
    setGame(createNewGame());
    setEndGameCopy("");
  };
  return (
    <Container>
      <Header>
        <A href="/">
          <img
            src="/img/logo.png"
            width={25}
            height={25}
            style={{
              "padding-left": "24px"
            }}
          />
        </A>
      </Header>

      <Main>
        <Show when={!isLoaded()}>
          <div style={{ width: "100%", "text-align": "center" }}>
            {sample(LOADING_COPY)}
          </div>
        </Show>

        <Show when={!isGameOver() && isLoaded() && !!currentCompany()}>
          <CurrentCompany company={currentCompany as Accessor<Company>} />

          <div
            style={{
              width: "200px",
              display: "flex",
              "flex-direction": "row",
              "justify-content": "space-around"
            }}
          >
            <Button
              buttonType={ButtonType.DANGER}
              onClick={() => {
                handleNext(false);
              }}
            >
              Fake
            </Button>

            <Button
              buttonType={ButtonType.SUCCESS}
              onClick={() => {
                handleNext(true);
              }}
            >
              Real
            </Button>
          </div>

          <ProgressBar pct={gamePct} />
        </Show>

        {/* GAME OVER */}
        <Show when={!!isGameOver()}>
          <GameOver
            game={game}
            endGameCopy={endGameCopy}
            handleNewGame={handleNewGame}
          />
        </Show>
      </Main>
    </Container>
  );
};
