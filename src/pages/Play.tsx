import { Component, Show, createEffect, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { sample } from "lodash";

import {
  Button,
  ButtonType,
  Container,
  Header,
  Main,
  Card,
  ProgressBar
} from "../components";
import { createNewGame, preloadImages } from "../utils/game";
import { Company } from "../types";
import theme from "../theme";
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

        <Show when={!isGameOver() && isLoaded()}>
          <div
            style={{
              width: "100%",
              display: "flex",
              "flex-direction": "column",
              "align-items": "center"
            }}
          >
            <img
              src={currentCompany()?.img}
              width={75}
              height={75}
              style={{
                "border-radius": "50%"
              }}
            />
            <h2>{currentCompany()?.name}</h2>
            <p
              style={{
                height: "80px",
                "overflow-y": "scroll",
                "max-width": "50%",
                "text-align": "center",
                "margin-bottom": "50px"
              }}
            >
              {currentCompany()?.description}
            </p>
          </div>

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
          <Card>
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                "justify-content": "center",
                "align-items": "center",
                "margin-bottom": "50px"
              }}
            >
              <img
                src="/img/logo.png"
                width={24}
                height={24}
                style={{
                  "margin-right": "12px"
                }}
              />
              <h3>
                Why{" "}
                <span style={{ color: theme.colors.orange }}>Combinator</span>
              </h3>
            </div>

            <h1>
              {game().score}/{game().companies.length}
            </h1>

            <Show when={!!endGameCopy()}>
              <p
                style={{
                  "max-width": "400px",
                  height: "30px",
                  "text-align": "center"
                }}
              >
                {endGameCopy()}
              </p>
            </Show>

            <div style={{ "margin-top": "75px" }}>
              <a
                style={{ "margin-right": "12px" }}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `I scored ${game().score}/${
                    game().companies.length
                  } on why-combinator.com: ${endGameCopy()}`
                )}`}
                target="_blank"
              >
                Tweet
              </a>

              <Button
                onClick={() => {
                  setGame(createNewGame());
                  setEndGameCopy("");
                }}
              >
                Again?
              </Button>
            </div>
          </Card>
        </Show>
      </Main>
    </Container>
  );
};
