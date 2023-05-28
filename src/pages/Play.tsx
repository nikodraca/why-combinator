import { Component, Show, createEffect, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { sample } from "lodash";

import { Button, Container, Header, Main, Card } from "../components";
import { createNewGame, preloadImages } from "../utils/game";
import { Company } from "../types";
import theme from "../theme";
import { LOADING_COPY, RESULTS } from "../constants";

export const Play: Component = () => {
  const [game, setGame] = createSignal(createNewGame());
  const [isGameOver, setIsGameOver] = createSignal(false);
  const [currentCompany, setCurrentCompany] = createSignal<Company>();
  const [isLoaded, setIsLoaded] = createSignal(false);

  createEffect(() => {
    const gameOver = game().index === game().companies.length;

    setIsGameOver(gameOver);
  });

  createEffect(() => {
    setCurrentCompany(game()?.companies[game().index]);
  });

  createEffect(() => {
    // Preload images so there isn't a lag when skipping steps
    if (!isLoaded()) {
      const handlePreloadComplete = () => {
        console.log("Images preloaded!");
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
          <div>{sample(LOADING_COPY)}</div>
        </Show>

        <Show when={!isGameOver() && isLoaded()}>
          <div
            style={{
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
                "max-width": "80%",
                height: "30px",
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
              onClick={() => {
                handleNext(false);
              }}
            >
              Fake
            </Button>

            <Button
              onClick={() => {
                handleNext(true);
              }}
            >
              Real
            </Button>
          </div>

          {/* PROGRESS BAR */}
          <div
            style={{
              position: "fixed",
              bottom: "0",
              left: "0",
              "background-color": theme.colors.orange,
              height: "12px",
              width: `${(game().index / game().companies.length) * 100}%`
            }}
          ></div>
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
            <p
              style={{
                "max-width": "400px",
                height: "30px",
                "text-align": "center",
                "margin-bottom": "75px"
              }}
            >
              {sample(RESULTS[game().score])}
            </p>
            <Button
              onClick={() => {
                setGame(createNewGame());
              }}
            >
              Again?
            </Button>
          </Card>
        </Show>
      </Main>
    </Container>
  );
};
