import theme from "../theme";

interface ProgressBarProps {
  pct: number;
}

export const ProgressBar = ({ pct }: ProgressBarProps) => (
  <div
    style={{
      position: "fixed",
      bottom: "0",
      left: "0",
      "background-color": theme.colors.orange,
      height: "12px",
      width: `${pct * 100}%`
    }}
  ></div>
);
