import { styled } from "solid-styled-components";

import theme from "../theme";

interface ButtonProps {
  buttonType?: ButtonType;
}

export enum ButtonType {
  DEFAULT = "default",
  SUCCESS = "success",
  DANGER = "danger"
}

const getButtonType = (type?: ButtonType) => {
  const defaultColors = {
    bg: theme.colors.orange,
    hoverBg: theme.colors.lightOrange
  };

  switch (type) {
    case ButtonType.DEFAULT:
      return defaultColors;

    case ButtonType.SUCCESS:
      return {
        bg: theme.colors.green,
        hoverBg: theme.colors.lightGreen
      };
    case ButtonType.DANGER:
      return {
        bg: theme.colors.red,
        hoverBg: theme.colors.lightRed
      };
    default:
      return defaultColors;
  }
};

export const Button = styled.button<ButtonProps>`
  text-decoration: none;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  background-color: ${({ buttonType }) => getButtonType(buttonType).bg};
  color: ${theme.colors.white};

  &:hover {
    background-color: ${({ buttonType }) => getButtonType(buttonType).hoverBg};
    color: ${theme.colors.white};
  }
`;
