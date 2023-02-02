

import { useSnackbar } from "notistack";
  export default function useNotification (){
    const notif = useSnackbar().enqueueSnackbar
    return notif
  }
