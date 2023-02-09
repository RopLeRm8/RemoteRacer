import { Box, CssVarsProvider } from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import Centered from "../features/Centered";
import Navbar from "../layouts/NavBar";
export default function Game() {
  const canvas = useRef();
  const [img, setImg] = useState(new Image());
  useEffect(() => {
    const ctx = canvas.current.getContext("3d");
    setImg(new Image());
    img.src = "http://10.9.21.19:81/stream";
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
    };
  }, []);
  return (
    <Box>
      <CssVarsProvider />
      <Navbar />
      <Centered>
        <canvas ref={canvas} height={"700vh"} width={"1200%"} />
      </Centered>
    </Box>
  );
}
