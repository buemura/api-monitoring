import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Resource } from "../types/resource";

export default function useWebsocket() {
  const [refresh, setRefresh] = useState(false);
  const [resourceUpdated, setResourceUpdated] = useState<Resource>();

  useEffect(() => {
    const socket = io("http://localhost:8081");

    socket.on("resourceUpdate", (data) => {
      setRefresh(true);
      setResourceUpdated(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { refresh, resourceUpdated };
}
