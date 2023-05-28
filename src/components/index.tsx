import { styled } from "solid-styled-components";

import theme from "../theme";

export const Button = styled.button`
  text-decoration: none;
  color: ${theme.colors.white};
  background-color: ${theme.colors.lightOrange};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.orange};
  }
`;

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
  height: 100vh;
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
