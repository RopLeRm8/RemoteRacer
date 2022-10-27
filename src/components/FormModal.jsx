import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const imageInput = useRef();
  const dialogRef = useRef();

  const handleClose = useCallback(() => {
    console.log(imageInput.current.files[0]);
    dialogRef.current.open = false;
  });

  return (
    <div>
      <Dialog
        open={true}
        onClose={() => setOpen(false)}
        dir="rtl"
        sx={{ fontFamily: "Noto Sans Hebrew" }}
        ref={dialogRef}
      >
        <DialogTitle>העלאת תמונה חדשה</DialogTitle>
        <DialogContent>
          <DialogContentText>
            לחץ מתחת בכדי להעלות תמונה חדשה שתשתמש לפרופיל שלך
          </DialogContentText>
          <Button variant="contained" component="label">
            העלאה
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              ref={imageInput}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סגירה</Button>

          <Button onClick={handleClose}>אשר</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
