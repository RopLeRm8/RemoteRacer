

import { useSnackbar } from "notistack";
import { useMemo } from "react";
export function useNotification () {
  const { enqueueSnackbar } = useSnackbar();
  const notif = useMemo(() => enqueueSnackbar, [enqueueSnackbar]);
  return notif;
}
