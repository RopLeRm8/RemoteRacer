export function authErrorToTitleCase(str) {
  return str
    ?.replaceAll("auth/", "")
    ?.replaceAll("-", " ")
    ?.split(" ")
    ?.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    ?.join(" ");
}
export function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
