import { Button as JOYButton } from "@mui/joy";
import { Button as MUIButton } from "@mui/material";
const defaultSx = {
  transition: "0.1s all ease-out",
  background: "orange",
  color: "black",
  border: "2px solid white",
  "&:hover": { background: "white" },
};
export function CustomButton(props) {
  const { text, onClickFunc, sx = {}, style, ...rest } = props;

  return (
    <MUIButton
      sx={{ ...defaultSx, ...sx, ...style }}
      {...rest}
      onClick={onClickFunc}
    >
      {text}
    </MUIButton>
  );
}
export function CustomButtonJoy(props) {
  const { text, onClickFunc, sx = {}, style, ...rest } = props;

  return (
    <JOYButton
      sx={{ ...defaultSx, ...sx, ...style }}
      {...rest}
      onClick={onClickFunc}
    >
      {text}
    </JOYButton>
  );
}
