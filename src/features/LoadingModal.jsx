import {
  Box,
  CircularProgress,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";

export default function LoadingModal({ isLoading }) {
  return (
    <Modal open={isLoading}>
      <ModalDialog>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ mr: 1 }} size="sm" color="warning" />
          <Typography
            sx={{
              color: "black",
              fontSize: "130%",
              fontFamily: "Poppins",
            }}
          >
            Loading data...
          </Typography>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
