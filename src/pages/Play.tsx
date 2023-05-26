import { Component, Show, createEffect, createSignal } from "solid-js";

import { Button, Container, Header, Main } from "../components";
import { createNewGame } from "../utils/game";
import { Company } from "../types";
import theme from "../theme";
import { random, sample } from "lodash";
import { RESULTS } from "../constants";

export const Play: Component = () => {
  const [game, setGame] = createSignal(createNewGame());
  const [isGameOver, setIsGameOver] = createSignal(false);
  const [currentCompany, setCurrentCompany] = createSignal<Company>();

  createEffect(() => {
    const gameOver = game().index === game().companies.length;

    setIsGameOver(gameOver);
  });

  createEffect(() => {
    setCurrentCompany(game()?.companies[game().index]);
  });

  const handleNext = (isReal: boolean) => {
    console.log(game());

    const newScore =
      currentCompany()?.real === isReal ? game().score + 1 : game().score;
    const newIndex = game().index + 1;

    setGame({ ...game(), index: newIndex, score: newScore });
  };

  return (
    <Container>
      <Header>
        <img src="/src/assets/logo.png" width={25} height={25} />
      </Header>

      <Main>
        {/* <span>Score: {game().score}</span> */}

        <Show when={!isGameOver()}>
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
                "max-width": "400px",
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
          <div
            style={{
              display: "flex",
              "flex-direction": "column",
              "justify-content": "center",
              "align-items": "center",
              "background-color": theme.colors.beige,
              padding: "50px",
              "border-radius": "10px",
              "box-shadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}
          >
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
                src="/src/assets/logo.png"
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
              Score: {game().score}/{game().companies.length}
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
          </div>
        </Show>
      </Main>
    </Container>
  );
};
