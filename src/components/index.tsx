import { styled } from "solid-styled-components";

import theme from "../theme";

export const Main = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  height: 100%;
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${theme.colors.beige};
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.beige};
  padding: 50px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  max-width: 50%;
`;

export { Button, ButtonType } from "./Button";
export { ProgressBar } from "./ProgressBar";
export { CurrentCompany } from "./CurrentCompany";
export { GameOver } from "./GameOver";
