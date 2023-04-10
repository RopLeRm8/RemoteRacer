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
import { useEffect, useRef, useState } from "react";
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
const inputTheme = {
  dark: "#403c44",
  light: "white",
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
    localStorage.getItem("themeColorChat") ?? "dark",
  );
  const reactionsToIcons = {
    happy: <SentimentSatisfiedAltIcon />,
    angry: <SentimentVeryDissatisfiedIcon />,
  };
  const inputRef = useRef();
  const handleMessageSend = () => {
    if (message?.length < 1 && !file) return;
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
    console.log(msg.time);
    const now = new Date();
    const msgTime = new Date(msg.time);

    // Swap day and month values
    const day = msgTime.getDate();
    const month = msgTime.getMonth() + 1;
    const year = msgTime.getFullYear();
    const hours = msgTime.getHours();
    const minutes = msgTime.getMinutes();

    const isToday =
      day === now.getDate() &&
      month === now.getMonth() + 1 &&
      year === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      day === yesterday.getDate() &&
      month === yesterday.getMonth() + 1 &&
      year === yesterday.getFullYear();

    let output;

    if (isToday || isYesterday) {
      const options = {
        hour: "numeric",
        minute: "numeric",
      };
      const timeString = msgTime.toLocaleString(undefined, options);

      output = (isToday ? "Today, " : "Yesterday, ") + timeString;
    } else {
      const options = {
        day: "numeric",
        month: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const dateString = new Date(
        year,
        day - 1,
        month,
        hours,
        minutes,
      ).toLocaleString("en-GB", options);
      output = dateString;
    }

    return output;
  };

  const checkIfNewDate = (msg, msgnext) => {
    if (!msgnext) return false;
    const msgTime = new Date(msg.time);

    const msgNextTime = new Date(msgnext.time);
    const newDay =
      msgTime.getDate() < msgNextTime.getDate() ||
      msgTime.getMonth() < msgNextTime.getMonth();

    if (newDay) {
      const newDate = new Date();
      newDate.setMonth(msgNextTime.getDate() - 1);
      const monthName = newDate.toLocaleString("en-GB", {
        month: "long",
      });
      return `${
        msgNextTime.getMonth() + 1
      } ${monthName} ${msgNextTime.getFullYear()}`;
    }
    return false;
  };

  useEffect(() => {
    localStorage.setItem("themeColorChat", themeColor);
  }, [themeColor]);

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
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            background: themeColors[themeColor],
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "space-between" },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                fontFamily="Poppins"
                startDecorator={<ChatIcon />}
                sx={{ color: textTheme[themeColor], mr: 1 }}
              >
                Chat with {chatWith?.name ?? "[No name set]"}
              </Typography>
              <Switch
                variant="solid"
                color="neutral"
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
                    border: "1px solid",
                    borderColor: textTheme[themeColor],
                    background: themeColors[themeColor],
                  },
                  "	.MuiSwitch-thumb": {
                    color: "black",
                    border: "1px solid black",
                  },
                  display: "initial",
                  mr: { xs: 2, sm: 0 },
                }}
                size="lg"
                onChange={() => {
                  setThemeColor((prev) => (prev === "dark" ? "light" : "dark"));
                }}
              />
            </Box>
            <IconButton
              onClick={() => setOpenChat(false)}
              color="neutral"
              variant="plain"
              size="sm"
              sx={{ color: textTheme[themeColor] }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            background: themeColors[themeColor],
            color: textTheme[themeColor],
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: themeColors[themeColor],
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: textTheme[themeColor],
              borderRadius: "2px",
            },
            scrollBehavior: "smooth",
          }}
        >
          {isLoading ? (
            <Typography sx={{ color: textTheme[themeColor] }}>
              Loading..
            </Typography>
          ) : null}
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
                    "&:hover": {
                      cursor: "pointer",
                      background: "rgba(0,0,0,0.1)",
                    },
                  }}
                  onMouseOver={() => setMessageHover(msg)}
                  onMouseLeave={() => setMessageHover(null)}
                >
                  <Box
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: "10px",
                    }}
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
                            width: "50%",
                            alignSelf:
                              msg.uid === user.uid ? "flex-start" : "flex-end",
                          }}
                        />
                      ) : (
                        <img
                          src={msg?.file}
                          alt=""
                          onClick={() => window.open(msg?.file)}
                          style={{
                            width: "50%",
                            alignSelf:
                              msg.uid === user.uid ? "flex-start" : "flex-end",
                          }}
                        />
                      )}

                      <Typography
                        fontFamily="Poppins"
                        sx={{
                          color: textTheme[themeColor],
                          wordBreak: "break-word",
                          maxWidth: "100%",
                          alignSelf:
                            msg.uid === user.uid ? "flex-start" : "flex-end",
                        }}
                      >
                        {msg?.msgContent}
                      </Typography>
                      <Typography
                        fontFamily="Poppins"
                        sx={{
                          color: textTheme[themeColor],
                          fontSize: "75%",
                          alignSelf:
                            msg.uid === user.uid ? "flex-start" : "flex-end",
                        }}
                      >
                        {formatMessageDate(msg)}
                      </Typography>
                      {messageHover === msg + msg.uid ? (
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
                size="lg"
                sx={{
                  width: "100%",
                  background: inputTheme[themeColor],
                  color: textTheme[themeColor],
                  border: themeColor === "dark" ? "0px solid" : "1px solid",
                }}
                ref={inputRef}
                color="info"
                value={message}
                placeholder="New message"
                onChange={(e) => setMessage(e.target.value)}
                endDecorator={
                  <>
                    {sendLoading ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        variant="plain"
                        color="neutral"
                        sx={{ color: textTheme[themeColor] }}
                        onClick={handleMessageSend}
                        disabled={sendLoading || fileLoading}
                      >
                        <SendIcon />
                      </IconButton>
                    )}
                    <IconButton
                      component="label"
                      variant="plain"
                      color="neutral"
                      sx={{ ml: 1, color: textTheme[themeColor] }}
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
              {fileLoading ? (
                <LinearProgress
                  variant="soft"
                  color="neutral"
                  sx={{ width: "100%" }}
                />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ color: textTheme[themeColor] }}>
                    {fileName ?? null}
                  </Typography>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={handleEmptyFile}
                    sx={{
                      display: fileName ? "flex" : "none",
                      color: textTheme[themeColor],
                      "&:hover": {
                        background: themeColor === "dark" && "transparent",
                      },
                    }}
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
