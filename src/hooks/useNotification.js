import { Button } from "@mui/joy";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
export function useNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = useMemo(
    () => (message, options) => {
      message = `[${options.variant.toUpperCase()}] ${message}`;
      return enqueueSnackbar(message, {
        ...options,
        action: (key) => (
          <Button
            onClick={() => closeSnackbar(key)}
            variant="soft"
            size="sm"
            color="neutral"
            sx={{
              color: "black",
              backgroundColor: "white",
              fontSize: "90%",
              fontFamily: "Inter",
              fontWeight: 500,
              borderRadius: "15px",
            }}
          >
            GOT IT
          </Button>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );
  return notification;
}
