import { useCallback } from "react";

export default function useAddAnimation() {
  return useCallback((elem, anim, timeout) => {
    elem.current.classList.add(anim);
    setTimeout(() => {
      elem.current.classList.remove(anim);
    }, timeout * 100);
  }, []);
}
