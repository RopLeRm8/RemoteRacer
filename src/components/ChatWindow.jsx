import { getAuth } from "@firebase/auth";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Input,
  LinearProgress,
  Switch,
  Typography,
} from "@mui/joy";
import { useMediaQuery } from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useLoadChat from "../hooks/useLoadChat";
import useSaveMessage from "../hooks/useSaveMessage";
import useUploadFile from "../hooks/useUploadFile";
const videoExtensions = {
  ".avi": true,
  ".mp4": true,
  ".mov": true,
};
const themeColors = {
  dark: "#38343c",
  light: "white",
};
const textTheme = {
  dark: "white",
  light: "black",
};
export default function ChatWindow({ openChat, setOpenChat, chatWith }) {
  const { chatData, isLoading, setChatData } = useLoadChat({
    chatWith,
    openChat,
  });
  const { saveMessage, sendLoading } = useSaveMessage({
    chatWith,
    setChatData,
  });
  const [user] = useAuthState(getAuth());
  const [message, setMessage] = useState(null);
  const [messageHover, setMessageHover] = useState(null);
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColorChat") ?? "dark"
  );
  const reactionsToIcons = {
    happy: <SentimentSatisfiedAltIcon />,
    angry: <SentimentVeryDissatisfiedIcon />,
  };
  const inputRef = useRef();
  const handleMessageSend = () => {
    saveMessage(message, file);
    setMessage("");
    setFile(null);
    setFileName(null);
  };
  const handleFileSave = async (e) => {
    setFileLoading(true);
    setFile(null);
    setFileName(null);
    const file = e.target.files[0];
    const { useUploadFileFunc } = useUploadFile();
    const downloadUrl = await useUploadFileFunc(file, user?.uid);
    if (!downloadUrl) {
      return;
    }
    setFileName(file.name);
    setFileLoading(false);
    setFile(downloadUrl);
  };
  const handleEmptyFile = () => {
    setFile(null);
    setFileName(null);
  };
  const formatMessageDate = (msg) => {
    const now = new Date();
    const [day, month, year, hours, minutes, seconds] = msg.time.split(/[/: ]/);
    const msgTime = new Date(year, month - 1, day, hours, minutes, seconds);

    const isToday =
      msgTime.getDate() === now.getDate() &&
      msgTime.getMonth() === now.getMonth() &&
      msgTime.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      msgTime.getDate() === yesterday.getDate() &&
      msgTime.getMonth() === yesterday.getMonth() &&
      msgTime.getFullYear() === yesterday.getFullYear();

    let output;

    if (isToday || isYesterday) {
      const options = {
        hour: "numeric",
        minute: "numeric",
      };
      const timeString = msgTime.toLocaleTimeString("en-US", options);

      output = (isToday ? "Today, " : "Yesterday, ") + timeString;
    } else {
      const options = {
        day: "numeric",
        month: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const dateString = msgTime.toLocaleDateString("en-US", options);
      output = dateString;
    }

    return output;
  };

  const checkIfNewDate = (msg, msgnext) => {
    if (!msgnext) return false;
    const [day, month, year, hours, minutes, seconds] = msg.time.split(/[/: ]/);
    const msgTime = new Date(year, month - 1, day, hours, minutes, seconds);

    const [daynext, monthnext, yearnext, hoursnext, minutesnext, secondsnext] =
      msgnext.time.split(/[/: ]/);
    const msgNextTime = new Date(
      yearnext,
      monthnext - 1,
      daynext,
      hoursnext,
      minutesnext,
      secondsnext
    );

    const newDay =
      msgTime.getDate() < msgNextTime.getDate() ||
      msgTime.getMonth() < msgNextTime.getMonth();

    if (newDay) {
      const monthName = msgNextTime.toLocaleString("default", {
        month: "long",
      });
      return (
        msgNextTime.getDate() +
        " " +
        monthName +
        " " +
        msgNextTime.getFullYear()
      );
    }
    return false;
  };
  const isXsScreen = useMediaQuery("(max-width:500px)");
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileName, setFileName] = useState(null);

  return (
    <>
      <Dialog
        open={openChat}
        onClose={() => setOpenChat(false)}
        fullWidth
        fullScreen={isXsScreen}
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            background: themeColors[themeColor],
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              fontFamily="Poppins"
              startDecorator={<ChatIcon />}
              sx={{ color: textTheme[themeColor] }}
            >
              Chat with {chatWith?.name ?? "[No name set]"}
            </Typography>
            <IconButton
              onClick={() => setOpenChat(false)}
              color="warning"
              size="sm"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {isLoading ? <Typography>Loading..</Typography> : null}
          {chatData.length === 0 ? (
            <Chip sx={{ fontFamily: "Poppins" }} variant="soft" color="warning">
              No chat messages yet, start the conversation!
            </Chip>
          ) : null}
          <Grid
            container
            direction="column"
            sx={{ display: "flex" }}
            spacing={2}
          >
            {chatData?.map((msg) => (
              <Box key={chatData.indexOf(msg)}>
                <Grid
                  item
                  sx={{
                    display:
                      msg.oppositeUid === chatWith?.uid ||
                      msg.oppositeUid === user.uid
                        ? "flex"
                        : "none",
                    justifyContent: msg.uid === user.uid ? "start" : "end",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: "10px",
                      "&:hover": {
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.1)",
                      },
                    }}
                    onMouseOver={() => setMessageHover(msg)}
                    onMouseLeave={() => setMessageHover(null)}
                  >
                    {msg.uid === user?.uid ? (
                      <Avatar src={user?.photoURL} sx={{ mr: 3 }} />
                    ) : null}

                    <Grid container direction="column">
                      {videoExtensions[
                        msg?.file?.split("/").pop().split("?")[0].slice(-4)
                      ] ? (
                        <video
                          src={msg?.file}
                          alt=""
                          controls
                          style={{
                            maxWidth: "100%",
                          }}
                        />
                      ) : (
                        <img
                          src={msg?.file}
                          alt=""
                          onClick={() => window.open(msg?.file)}
                          style={{
                            maxWidth: "100%",
                          }}
                        />
                      )}

                      <Typography
                        fontFamily="Poppins"
                        sx={{
                          color: "black",
                          wordBreak: "break-word",
                          maxWidth: "100%",
                        }}
                      >
                        {msg?.msgContent}
                      </Typography>
                      <Typography
                        fontFamily="Poppins"
                        sx={{
                          fontSize: "75%",
                          color: "rgba(0,0,0,0.5)",
                        }}
                      >
                        {formatMessageDate(msg)}
                      </Typography>
                      {messageHover === msg ? (
                        <Box sx={{ display: "flex" }}>
                          <IconButton
                            size="sm"
                            sx={{ width: "10%" }}
                            color="neutral"
                          >
                            <SentimentSatisfiedAltIcon />
                          </IconButton>
                          <IconButton
                            size="sm"
                            sx={{ width: "10%" }}
                            color="neutral"
                          >
                            <SentimentVeryDissatisfiedIcon />
                          </IconButton>
                        </Box>
                      ) : null}

                      <Box sx={{ display: "flex" }}>
                        {msg?.reactions?.map((reaction) => (
                          <Box
                            key={reaction.name}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              background: "orange",
                              borderRadius: "10px",
                              mr: 1,
                              px: 1,
                            }}
                          >
                            <Typography sx={{ mr: 0.2 }}>
                              {reaction.count}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {reactionsToIcons[reaction.name]}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                    {msg.uid !== user?.uid ? (
                      <Avatar src={chatWith?.photoURL} sx={{ ml: { xs: 3 } }} />
                    ) : null}
                  </Box>
                </Grid>
                {checkIfNewDate(msg, chatData[chatData.indexOf(msg) + 1]) !==
                false ? (
                  <Divider>
                    {checkIfNewDate(msg, chatData[chatData.indexOf(msg) + 1])}
                  </Divider>
                ) : null}
              </Box>
            ))}

            <Grid item sx={{ mt: 2, display: "flex" }}>
              <Input
                autoFocus
                sx={{ width: "20rem" }}
                ref={inputRef}
                value={message}
                placeholder="New message"
                color="warning"
                onChange={(e) => setMessage(e.target.value)}
                endDecorator={
                  <>
                    {sendLoading ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        variant="plain"
                        color="neutral"
                        onClick={handleMessageSend}
                        disabled={sendLoading || fileLoading}
                      >
                        <SendIcon />
                      </IconButton>
                    )}
                    <IconButton
                      component="label"
                      variant="outlined"
                      color="neutral"
                      sx={{ ml: 1 }}
                      size="sm"
                    >
                      <AttachFileIcon />
                      <input
                        hidden
                        accept="image/*,video/mp4,video/quicktime,video/x-msvideo"
                        type="file"
                        onChange={(e) => handleFileSave(e)}
                      />
                    </IconButton>
                  </>
                }
              />
            </Grid>
            <Grid item>
              <Switch
                variant="soft"
                slotProps={{
                  thumb: {
                    children:
                      themeColor === "dark" ? (
                        <DarkModeIcon />
                      ) : (
                        <LightModeIcon />
                      ),
                  },
                }}
                sx={{
                  "--Switch-thumbSize": "28px",
                  "	.MuiSwitch-track": {
                    border: "1px solid black",
                    background: themeColors[themeColor],
                  },
                }}
                size="lg"
                onChange={() =>
                  setThemeColor((prev) => (prev === "dark" ? "light" : "dark"))
                }
              />
            </Grid>
            <Grid item>
              {fileLoading ? (
                <LinearProgress
                  variant="outlined"
                  color="warning"
                  sx={{ width: "20rem" }}
                />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{fileName ?? null}</Typography>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="warning"
                    onClick={handleEmptyFile}
                    sx={{ display: fileName ? "flex" : "none" }}
                  >
                    X
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
