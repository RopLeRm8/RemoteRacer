import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useSetupMessage() {
  const [user] = useAuthState(getAuth());
  const clientName = user.displayName;
  const clientEmail = user.email;

  const updateMessage = (messageData, eNums) => {
    messageData.clientName = clientName;
    messageData.clientEmail = clientEmail;
    if (!messageData.issueType) {
      messageData.issueType = "NONE";
    }
    messageData.subject = eNums.eNumSubject[messageData.subject];
    return messageData;
  };

  return updateMessage;
}
