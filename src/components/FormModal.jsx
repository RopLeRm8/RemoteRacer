import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, updateProfile } from "@firebase/auth";
import ImageIcon from "@mui/icons-material/Image";
import { Typography } from "@mui/joy";

export default function FormDialog({ open, setOpen, setupdateLoading }) {
  const [imageName, setimageName] = useState("");
  const [image, setImage] = useState(null);
  const [user] = useAuthState(getAuth());
  const [error, setError] = useState("");

  const handleClose = useCallback((validateCheck) => {
    setupdateLoading(false);
    validateCheck &&
      updateProfile(user, {
        photoURL: image,
      }).then(
        () => {},
        (err) => {}
      );
    setOpen(false);
    setimageName("");
    setImage(null);
  });
  const changeHandler = (val) => {
    if (val.target.files[0]?.size > 200000) {
      setError("הקובץ גדול מדי!");
    } else {
      setimageName(val.target.files[0].name);
      setImage(URL.createObjectURL(val.target.files[0]));
      setError("");
    }
  };

  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        dir="rtl"
        sx={{ fontFamily: "Noto Sans Hebrew" }}
        open={open}
      >
        <DialogTitle>העלאת תמונה חדשה</DialogTitle>
        <DialogContent>
          <Typography className="mb-2">
            לחץ מתחת בכדי להעלות תמונה חדשה שתשתמש לפרופיל שלך
          </Typography>
          <Button variant="contained" component="label">
            העלאה
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={changeHandler}
            />
          </Button>
          <span className="me-4 ms-4" style={{ fontSize: 15 }}>
            {imageName}
          </span>
          <img src={image} width="200px" className="mt-2" />
          {error}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>סגירה</Button>
          {imageName && <Button onClick={() => handleClose(true)}>אשר</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
