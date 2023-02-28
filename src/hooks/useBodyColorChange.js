export default function useBodyColorChange() {
  return () => {
    const prevColor = document.body.style.background;
    document.body.style.background = "black";
    return () => {
      document.body.style.background = prevColor;
    };
  };
}
