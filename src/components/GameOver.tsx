import { Show } from "solid-js";

import { Card, Button } from ".";
import { Game } from "../types";
import theme from "../theme";

interface GameOverInterface {
  game: () => Game;
  endGameCopy: () => string;
  handleNewGame: () => void;
}

export const GameOver = ({
  game,
  endGameCopy,
  handleNewGame
}: GameOverInterface) => (
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
        Why <span style={{ color: theme.colors.orange }}>Combinator</span>
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

      <Button onClick={handleNewGame}>Again?</Button>
    </div>
  </Card>
);
