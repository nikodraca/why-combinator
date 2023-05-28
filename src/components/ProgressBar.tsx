import theme from "../theme";

interface ProgressBarProps {
  pct: () => number;
}

export const ProgressBar = ({ pct }: ProgressBarProps) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        "background-color": theme.colors.orange,
        height: "12px",
        width: `${pct() * 100}%`,
        transition: "width 0.3s ease"
      }}
    />
  );
};
