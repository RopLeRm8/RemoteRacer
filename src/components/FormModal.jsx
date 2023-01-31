import { getAuth, updateProfile } from "@firebase/auth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Button,
  Card,
  Chip,
  CssVarsProvider,
  Divider,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ref as refDB, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/FormModal.css";
import { db, storage } from "../providers/FirebaseProvider";

export default function FormModal({
  open,
  setOpen,
  setupdateLoading,
  avatarRefer,
  setStam,
  setstamProfile,
}) {
  const [imageName, setimageName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setimageURL] = useState(null);
  const [error, setError] = useState("");
  const [showText, setshowText] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [user] = useAuthState(getAuth());

  const userRefAchiv = refDB(db, `users/${user.uid}/achievements`);
  const userRefData = refDB(db, `users/${user.uid}/data`);

  const storageRef = ref(storage, `users/${user.uid}/profilePicture.png`);

  const handleClose = useCallback(
    (validateCheck) => {
      setupdateLoading(false);
      if (validateCheck) {
        uploadBytes(storageRef, image)
          .then(() => {
            getDownloadURL(storageRef)
              .then((url) => {
                updateProfile(user, {
                  photoURL: url,
                })
                  .then(() => {
                    update(userRefAchiv, {
                      firstSetup: true,
                    });
                    update(userRefData, {
                      photoURL: url,
                    });
                    enqueueSnackbar("Successfully updated profile picture", {
                      variant: "success",
                    });
                    avatarRefer.current.src = url;
                    setStam((prev) => !prev);
                    setstamProfile((prev) => !prev);
                  })
                  .catch(() => {
                    enqueueSnackbar("Couldnt update profile Info!");
                  });
              })
              .catch(() => {
                enqueueSnackbar("Couldnt get download URL of image", {
                  variant: "error",
                });
              });
          })
          .catch(() => {
            enqueueSnackbar("Couldnt upload the image into the storage!", {
              variant: "error",
            });
          });
      }
      setimageName("");
      setImage(null);
      setOpen(false);
      setError(null);
      setUploadLoading(false);
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

    if (val.target.files[0]?.size > 8400000) {
      setError("The maximum size is 8MB");
      setimageName(null);
      setImage(null);
      setimageURL(null);
    } else {
      val.target.files[0]
        ? setimageName(
            val.target.files[0]?.name.slice(0, 10) + ` (${exactSize})`
          )
        : setimageName("");
      setImage(val.target.files[0]);
      setimageURL(URL.createObjectURL(val.target.files[0]));
      setError("");
    }
    setUploadLoading((prev) => !prev);
  };

  return (
    <Box>
      <CssVarsProvider />
      <Dialog
        onClose={() => {
          setOpen(false);
          setimageName(null);
          setImage(null);
          setUploadLoading(false);
        }}
        open={open}
      >
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            p: 2,
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontFamily: "Poppins",
              fontWeight: 500,
            }}
          >
            UPLOAD NEW IMAGE
          </DialogTitle>

          <Divider
            sx={{
              backgroundColor: "white",
              mx: 3,
              // "@media screen and (max-width: 90em)": {
              //   display: "none",
              // },
            }}
          />

          <Grid container direction="column">
            <DialogContent sx={{ p: 2 }}>
              <Typography sx={{ mb: 2, textAlign: "center", color: "white" }}>
                Click the UPLOAD button to update your profile picture, make
                sure its less than 8MB
              </Typography>
              <Grid item sx={{ mb: 2 }}>
                {uploadLoading ? (
                  <Button
                    variant="outlined"
                    color="warning"
                    component="label"
                    sx={{ fontFamily: "Inter", width: "100%", color: "white" }}
                    loading
                  >
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={changeHandler}
                    />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    component="label"
                    sx={{
                      fontFamily: "Inter",
                      width: "100%",
                      color: "white",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                    startDecorator={<ArrowUpwardIcon />}
                    onClick={() => setUploadLoading(true)}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={changeHandler}
                    />
                  </Button>
                )}
              </Grid>

              {imageName && (
                <Chip
                  variant="soft"
                  color="warning"
                  sx={{
                    "--Chip-radius": "9px",
                    "--Chip-gap": "7px",
                    "--Chip-minHeight": "33px",
                    maxWidth: "100%",
                  }}
                  startDecorator={<FilePresentIcon />}
                >
                  <Typography>{imageName}</Typography>
                </Chip>
              )}
              <Grid item sx={{ mt: 2 }}>
                {image && (
                  <Box
                    sx={{
                      width: "150px",
                      "&:hover": {
                        opacity: "50%",
                      },
                    }}
                  >
                    <Button
                      onMouseOver={() => setshowText(true)}
                      onMouseLeave={() => setshowText(false)}
                      onClick={() => setopenModal(true)}
                      sx={{
                        backgroundColor: "inherit",
                        "&:hover": {
                          backgroundColor: "inherit",
                        },
                      }}
                    >
                      <Card variant="outlined" color="warning">
                        <Typography
                          sx={{
                            display: showText ? "flex" : "none",
                            justifyContent: "center",
                            mb: 1,
                          }}
                        >
                          PREVIEW
                        </Typography>
                        <img src={imageURL} width="150px" alt="" />
                      </Card>
                    </Button>
                  </Box>
                )}
              </Grid>

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
          </Grid>
          <DialogActions>
            {imageName && (
              <Button
                sx={{
                  fontFamily: "Poppins",
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                }}
                onClick={() => handleClose(true)}
                color="success"
                variant="outlined"
                size="sm"
              >
                CONFIRM
              </Button>
            )}
            <Button
              sx={{
                fontFamily: "Poppins",
                color: "white",
                "&:hover": {
                  color: "black",
                },
              }}
              onClick={() => handleClose(false)}
              color="danger"
              variant="outlined"
              size="sm"
            >
              CLOSE
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Modal open={openModal} onClose={() => setopenModal(false)}>
        <ModalDialog color="warning" sx={{ width: "25%" }}>
          <ModalClose />
          <Box sx={{ animation: "popup 0.2s" }}>
            <Typography
              fontFamily="Montserrat"
              level="h3"
              sx={{ textAlign: "center", mb: 2 }}
            >
              Image Preview
            </Typography>
            <Divider sx={{ bgcolor: "black", mb: 2 }} />
            <img src={imageURL} style={{ maxWidth: "100%" }} alt="" />
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
