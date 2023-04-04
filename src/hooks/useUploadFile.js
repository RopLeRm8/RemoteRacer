import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../providers/FirebaseProvider";

export default function useUploadFile() {
  const useUploadFileFunc = (file, uid) => {
    if (!file) return false;
    const storageRef = ref(storage, `users/${uid}/chatMessage/${file.name}`);
    return uploadBytes(storageRef, file).then(() => {
      return getDownloadURL(storageRef);
    });
  };
  return { useUploadFileFunc };
}
