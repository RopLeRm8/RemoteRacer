import ErrorIcon from "@mui/icons-material/Error";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { Box, Chip, CssVarsProvider, Grid } from "@mui/joy";
import { Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  // BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  // MirroredRepeatWrapping,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import coin from "../assets/Game/coin.png";
import "../css/Game.css";
import Centered from "../features/Centered";
import { useNotification } from "../hooks/useNotification";
export default function Game() {
  const canvas = useRef();
  const notify = useNotification();
  const [imgLoading, setimgLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const ip = localStorage.getItem("ip");
  useEffect(() => {
    document.body.classList.add("nooverflow");
    if (ip === "192.168.4.1") {
      setError(
        "ESP needs to have an access to the internet in order to play this game"
      );
      return () => {
        document.body.classList.remove("nooverflow");
      };
    }
    const onDocumentKeyDown = (event) => {
      if (camera === undefined) return;
      const keyCode = event.which;
      switch (keyCode) {
        case 87:
          camera.position.z -= 10;
          break;
        case 83:
          camera.position.z += 10;
          break;
        case 65:
          camera.position.x += 10;
          break;
        case 68:
          camera.position.x -= 10;
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", onDocumentKeyDown, false);

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.85);
    canvas.current.appendChild(renderer.domElement);

    const texture = new TextureLoader().load(
      `http://${ip}:81/stream`,
      () => setimgLoading(false),
      undefined,
      () => {
        notify("Failed to load stream, refresh the page to try again", {
          variant: "error",
        });
        setimgLoading(false);
        setError("Failed to load stream, refresh the page to try again");
      }
    );
    const textUpdate = setInterval(() => {
      texture.needsUpdate = true;
    }, 100);
    scene.background = texture;

    camera.position.z = 1000;

    const coinTexture = new TextureLoader().load(coin);
    const coinGeometry = new PlaneGeometry(60, 60);
    const coinMaterial = new MeshBasicMaterial({ map: coinTexture });
    const coins = [];
    const maxCoins = 20;

    const addCoin = () => {
      if (coins.length >= maxCoins) return;

      const coin = new Mesh(coinGeometry, coinMaterial);
      coin.position.x = Math.random() * 3500 - 360;
      coin.position.y = -5;
      coin.position.z = Math.random() * 970;
      scene.add(coin);
      coins.push(coin);
    };

    setInterval(() => {
      addCoin();
    }, 1000);

    const updateCoins = () => {
      for (const coin of coins) {
        if (camera.position.distanceTo(coin.position) < 20) {
          coin.scale.x += 0.01;
          coin.scale.y += 0.01;
          coin.scale.z += 0.01;

          if (coin.scale.x >= 2) {
            scene.remove(coin);
            coins.splice(coins.indexOf(coin), 1);
            setPoints((prev) => prev + 15);
          }
        } else {
          coin.scale.x = 1;
          coin.scale.y = 1;
          coin.scale.z = 1;
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      updateCoins();
      renderer.render(scene, camera);
    };

    animate();
    return () => {
      document.body.classList.remove("nooverflow");
      renderer.clear();
      clearInterval(textUpdate);
    };
  }, [notify, ip]);
  return (
    <Box>
      <CssVarsProvider />
      <Centered>
        <Grid
          container
          alignItems="center"
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-evenly"
        >
          <Grid item>
            <Button
              startIcon={<KeyboardBackspaceIcon />}
              variant="outlined"
              sx={{ mb: error ? 1 : 0 }}
              onClick={() => navigate("/")}
            >
              Return to main page
            </Button>
          </Grid>
          <Grid item sx={{ display: error ? "none" : "flex" }}>
            <SportsScoreIcon />
            <Typography>{points}</Typography>
          </Grid>
          <Grid item sx={{ display: error ? "none" : "flex" }}>
            <Typography>{points}</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" direction="column">
          {imgLoading && !error ? (
            <Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "120%",
                  fontFamily: "Poppins",
                }}
              >
                Connecting to ESP...
              </Typography>
              <LinearProgress color="warning" sx={{ mb: imgLoading ? 2 : 0 }} />
            </Box>
          ) : null}
          <Box
            ref={canvas}
            sx={{
              mb: imgLoading ? 0 : 5,
              display: error ? "none" : "flex",
            }}
          ></Box>
        </Grid>
        <Typography
          variant="overline"
          sx={{
            display: error ? "flex" : "none",
            justifyContent: "center",
          }}
        >
          {error}
        </Typography>
        <Chip
          startDecorator={<ErrorIcon />}
          color="danger"
          variant="soft"
          size="lg"
          sx={{
            mb: imgLoading ? 0 : 5,
            display: error ? "flex" : "none",
          }}
        >
          Errors Found. Please make sure you fix them before refreshing the page
        </Chip>
      </Centered>
    </Box>
  );
}
