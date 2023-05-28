import { Component } from "solid-js";
import { A } from "@solidjs/router";

import theme from "../theme";
import { Button, Main } from "../components";

export const Home: Component = () => {
  return (
    <Main>
      <img src="/img/logo.png" width={75} height={75} />
      <h2>
        Why <span style={{ color: theme.colors.orange }}>Combinator</span>
      </h2>
      <p
        style={{
          "text-align": "center",
          "max-width": "50%"
        }}
      >
        Does AI have what it takes to replace the fine people at{" "}
        <a href="https://www.ycombinator.com/" target="_blank">
          Y Combinator
        </a>
        ?
      </p>

      <p
        style={{
          "text-align": "center",
          "max-width": "50%",
          "margin-bottom": "50px"
        }}
      >
        Can you discern between real companies that have raised millions in VC
        funding and completely made-up techspeak
      </p>

      <A href={`/play`}>
        <Button>Let's Go</Button>
      </A>
    </Main>
  );
};
