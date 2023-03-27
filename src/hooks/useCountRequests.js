import { useEffect, useState } from "react";
import useGetRequestData from "./useGetRequestData";

export default function useCountRequests() {
  const { requests } = useGetRequestData();
  const [returnLength, setReturnLength] = useState(0);

  useEffect(() => {
    setReturnLength(requests.length);
  }, [requests]);

  return { returnLength };
}
