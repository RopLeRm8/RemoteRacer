import { useEffect } from "react";
import useGetRequestData from "./useGetRequestData";

export default function useCountRequests() {
  const { requests } = useGetRequestData();
  const returnLength = requests.length;
  useEffect(() => {
    console.log(returnLength);
  }, [returnLength]);
  return { returnLength };
}
