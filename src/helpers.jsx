export function authErrorToTitleCase(str) {
  return str
    ?.replaceAll("auth/", "")
    ?.replaceAll("-", " ")
    ?.split(" ")
    ?.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    ?.join(" ");
}
