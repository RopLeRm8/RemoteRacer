import { useEffect } from "react";

export default function useBodyColorChange() {
  useEffect(() => {
    const prevColor = document.body.style.background;
    document.body.style.background = "black";
    return () => {
      document.body.style.background = prevColor;
    };
  }, []);
}
