import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Divider } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";
import { Typography, Box, Chip } from "@mui/joy";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../providers/FirebaseProvider";
import { getAuth, updateProfile } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import WarningIcon from "@mui/icons-material/Warning";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { db } from "../providers/FirebaseProvider";
import { ref as refDB, update } from "firebase/database";
import { useSnackbar } from "notistack";

export default function FormDialog({
  open,
  setOpen,
  setupdateLoading,
  avatarRefer,
  setStam,
}) {
  const [imageName, setimageName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [user] = useAuthState(getAuth());

  const userRefAchiv = refDB(db, `users/${user.uid}/achievements`);
  const userRefData = refDB(db, `users/${user.uid}/data`);

  const storageRef = ref(storage, `users/${user.uid}/profilePicture.png`);

  const handleClose = useCallback(
    (validateCheck) => {
      setupdateLoading(false);
      if (validateCheck) {
        uploadBytes(storageRef, image).then(() => {
          getDownloadURL(storageRef).then((url) => {
            updateProfile(user, {
              photoURL: url,
            }).then(() => {
              update(userRefAchiv, {
                firstSetup: true,
              });
              update(userRefData, {
                photoURL: url,
              });
              enqueueSnackbar("התמונה שונתה בהצלחה", {
                variant: "success",
                dir: "rtl",
              });
              avatarRefer.current.src = url;
              setStam((prev) => !prev);
            });
          });
        });
      }
      setimageName("");
      setImage(null);
      setOpen(false);
      setError(null);
    },
    [image, setOpen, setupdateLoading, storageRef, user, avatarRefer, setStam]
  );
  const changeHandler = (val) => {
    let size = val.target.files[0]?.size;
    let fSExt = new Array("Bytes", "KB", "MB", "GB"),
      i = 0;
    while (size > 900) {
      size /= 1024;
      i++;
    }
    let exactSize = Math.round(size * 100) / 100 + " " + fSExt[i];

    if (val.target.files[0]?.size > 1050000) {
      setError("הקובץ גדול מדי, גודל מותר הוא עד 1MB");
      setimageName(null);
      setImage(null);
    } else {
      setimageName(val.target.files[0]?.name + ` (${exactSize})`);
      setImage(val.target.files[0]);
      setError("");
    }
  };

  return (
    <Box>
      <Dialog
        onClose={() => {
          setOpen(false);
          setimageName(null);
          setImage(null);
        }}
        dir="rtl"
        sx={{ fontFamily: "Noto Sans Hebrew" }}
        open={open}
      >
        <DialogTitle>העלאת תמונה חדשה</DialogTitle>

        <Divider
          flexItem
          sx={{
            backgroundColor: "black",
            mx: 3,
            "@media screen and (max-width: 90em)": {
              display: "none",
            },
          }}
        />
        <DialogContent sx={{ p: 2 }}>
          <Typography sx={{ mb: 2 }}>
            לחץ מתחת בכדי להעלות תמונה חדשה שתשתמש לפרופיל שלך
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ fontFamily: "Noto Sans Hebrew" }}
            endIcon={<ArrowUpwardIcon sx={{ mr: 2 }} />}
          >
            העלאה
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={changeHandler}
            />
          </Button>
          {imageName && (
            <Chip
              variant="soft"
              sx={{
                "--Chip-radius": "9px",
                mt: 2,
                "--Chip-gap": "7px",
                "--Chip-minHeight": "33px",
              }}
              startDecorator={<FilePresentIcon />}
            >
              <Typography>{imageName}</Typography>
            </Chip>
          )}

          {image && <img src={image} width="200px" sx={{ mt: 2 }} alt="" />}

          {error && (
            <Chip
              color="danger"
              variant="soft"
              sx={{ "--Chip-radius": "9px" }}
              startDecorator={<WarningIcon />}
            >
              {error}
            </Chip>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Noto Sans Hebrew" }}
            onClick={() => handleClose(false)}
          >
            סגירה
          </Button>
          {imageName && (
            <Button
              sx={{ fontFamily: "Noto Sans Hebrew" }}
              onClick={() => handleClose(true)}
            >
              אשר
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
