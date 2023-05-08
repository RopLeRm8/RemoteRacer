import { getAuth } from "@firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ErrorIcon from "@mui/icons-material/Error";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { Box, Chip, CssVarsProvider, Grid } from "@mui/joy";
import { Button, IconButton, LinearProgress, Typography } from "@mui/material";
import { get, ref, set, update } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
import { CustomButton } from "../features/CustomButton";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";
export default function Game() {
  const canvas = useRef();
  const notify = useNotification();
  const [imgLoading, setimgLoading] = useState(true);
  const [pointsCount, setPoints] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const ip = localStorage.getItem("ip");
  const espRef = ref(db, "esp/direction");
  const [cameraVal, setCamera] = useState(null);
  const [user] = useAuthState(getAuth());
  const userRef = ref(db, `users/${user?.uid}/data`);
  const handleSubmitClick = () => {
    if (pointsCount === 0) {
      notify("Earn more points!", { variant: "error" });
      return;
    }
    get(userRef).then((snap) => {
      const userData = snap.val();
      const points = snap.val()?.points ?? 0;
      const games = snap.val()?.games ?? 0;
      const updatedData = {
        ...userData,
        points: points + pointsCount,
        games: games + 1,
      };
      update(userRef, updatedData)
        .then(() => {
          notify("Successfully finished the game", { variant: "success" });
          navigate("/dashboard");
        })
        .catch(() =>
          notify("There was an error finishing the game", { variant: "error" }),
        );
    });
  };
  const handleMove = (side) => {
    console.log(side);
    switch (side) {
      case "left":
        set(espRef, "left").then(() => {
          cameraVal.position.y -= 50;
        });
        setTimeout(() => {
          set(espRef, "nothing");
        }, 1000);
        break;
      case "right":
        set(espRef, "right").then(() => {
          cameraVal.position.y += 50;
        });
        setTimeout(() => {
          set(espRef, "nothing");
        }, 1000);
        break;
      case "back":
        set(espRef, "back").then(() => {
          cameraVal.position.z -= 50;
        });
        setTimeout(() => {
          set(espRef, "nothing");
        }, 1000);
        break;
      case "forward":
        set(espRef, "forward").then(() => {
          cameraVal.position.z += 50;
        });
        setTimeout(() => {
          set(espRef, "nothing");
        }, 1000);
        break;
    }
  };

  useEffect(() => {
    document.body.classList.add("nooverflow");
    if (ip === "192.168.4.1") {
      setError(
        "ESP needs to have an access to the internet in order to play this game",
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
          set(espRef, "back").then(() => {
            camera.position.z -= 50;
          });
          break;
        case 83:
          set(espRef, "forward").then(() => {
            camera.position.z += 50;
          });
          break;
        case 65:
          set(espRef, "left").then(() => {
            camera.position.y -= 50;
          });
          break;
        case 68:
          set(espRef, "right").then(() => {
            camera.position.y += 50;
          });
          break;
        default:
          set(espRef, "nothing");
          break;
      }
    };
    document.addEventListener("keydown", onDocumentKeyDown, false);
    const onDocumentKeyUp = (event) => {
      if (camera === undefined) return;
      const keyCode = event.which;
      switch (keyCode) {
        case 87:
        case 83:
        case 65:
        case 68:
          set(espRef, "nothing");
          break;
        default:
          break;
      }
    };
    document.addEventListener("keyup", onDocumentKeyUp, false);
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    setCamera(camera);

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.45, window.innerHeight);
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
      },
    );
    const textUpdate = setInterval(() => {
      texture.needsUpdate = true;
    }, 50);
    scene.background = texture;

    camera.position.z = 1000;

    const coinTexture = new TextureLoader().load(coin);
    const coinGeometry = new PlaneGeometry(100, 100);
    const coinMaterial = new MeshBasicMaterial({
      map: coinTexture,
      transparent: true,
      alphaTest: 0.5,
    });
    const coins = [];
    const maxCoins = 20;

    const addCoin = () => {
      if (coins.length >= maxCoins) return;

      const coin = new Mesh(coinGeometry, coinMaterial);
      coin.position.x = 10;
      coin.position.y = Math.random() * 3500 - 360;
      coin.position.z = camera.position.z - 500 + Math.random() * 1000;
      coin.frustumCulled = false;
      scene.add(coin);
      coins.push(coin);
    };

    setInterval(() => {
      addCoin();
    }, 3000);

    const updateCoins = () => {
      for (const coin of coins) {
        if (camera.position.distanceTo(coin.position) < 50) {
          coin.scale.x += 0.02;
          coin.scale.y += 0.02;
          coin.scale.z += 0.02;

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
              size="small"
            >
              Return to main page
            </Button>
          </Grid>
          <Grid item sx={{ display: error ? "none" : "flex" }}>
            <SportsScoreIcon />
            <Typography>{pointsCount}</Typography>
          </Grid>
          <Grid item sx={{ display: error ? "none" : "flex" }}>
            <CustomButton
              text="Finish the game"
              onClickFunc={handleSubmitClick}
            />
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

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Box sx={{ display: "block" }}>
              <IconButton onClick={() => handleMove("forward")}>
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton onClick={() => handleMove("back")}>
                <ArrowDownwardIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "block" }}>
              <IconButton onClick={() => handleMove("left")}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton onClick={() => handleMove("right")}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            ref={canvas}
            sx={{
              transform: "rotate(90deg)",
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
            fontSize: "1.1vh",
          }}
        >
          {error}
        </Typography>
        <Chip
          startDecorator={<ErrorIcon />}
          color="danger"
          variant="soft"
          sx={{
            mb: imgLoading ? 0 : 5,
            display: error ? "flex" : "none",
            p: 1,
          }}
        >
          <Typography sx={{ fontSize: "0.9rem" }}>Errors Found.</Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>
            Please make sure you fix them before refreshing
          </Typography>
        </Chip>
      </Centered>
    </Box>
  );
}
