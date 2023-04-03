import { getAuth } from "@firebase/auth";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Avatar, Box, Chip, Grid, IconButton, Input } from "@mui/joy";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CustomButton } from "../features/CustomButton";
import useLoadChat from "../hooks/useLoadChat";
import useSaveMessage from "../hooks/useSaveMessage";
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
  const reactionsToIcons = {
    happy: <SentimentSatisfiedAltIcon />,
    angry: <SentimentVeryDissatisfiedIcon />,
  };
  const inputRef = useRef();
  const handleMessageSend = () => {
    saveMessage(message);
    setMessage("");
  };

  return (
    <>
      <Dialog open={openChat} onClose={() => setOpenChat(false)} fullScreen>
        <DialogTitle sx={{ fontFamily: "Poppins" }}>
          Chat with {chatWith?.name}
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
              <Grid
                item
                key={chatData.indexOf(msg)}
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
                    <Typography
                      fontFamily="Poppins"
                      sx={{
                        color: "black",
                        wordBreak: "break-word",
                        maxWidth: "100%",
                      }}
                    >
                      {msg.msgContent}
                    </Typography>
                    <Typography
                      fontFamily="Poppins"
                      sx={{
                        fontSize: "75%",
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      {msg.time}
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
                    <Avatar src={chatWith?.photoURL} sx={{ ml: { sm: 3 } }} />
                  ) : null}
                </Box>
              </Grid>
            ))}
            <Grid item sx={{ mt: 2 }}>
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
                        disabled={sendLoading}
                      >
                        <SendIcon />
                      </IconButton>
                    )}
                  </>
                }
              />
            </Grid>
            <Grid item>
              <CustomButton
                text="Close the chat"
                onClickFunc={() => setOpenChat(false)}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
