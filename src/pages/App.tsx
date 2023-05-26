import { Component } from "solid-js";
import { A } from "@solidjs/router";

import theme from "../theme";
import { Button, Main } from "../components";

export const App: Component = () => {
  return (
    <Main>
      <img src="/img/logo.png" width={75} height={75} />
      <h2>
        Why <span style={{ color: theme.colors.orange }}>Combinator</span>
      </h2>
      <p
        style={{
          "text-align": "center"
        }}
      >
        Does AI have what it takes to replace the fine people at Y Combinator?
        <br />
        See if you can determine which of these companies is real
      </p>

      <br />

      <A href={`/play`}>
        <Button>Let's Go</Button>
      </A>
    </Main>
  );
};
