import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  /*  Enhancement: provide an interface to attach events to the socket instead of
      
      type EventListener = Parameters<Socket["on"]>[1];

      subscribing manually with useEffects in the client components
      const attachEvent = (event: string, eventListener: EventListener) => {
        if (socket) socket.on(event, eventListener);
      };
  */

  useEffect(() => {
    const instance = io(url);
    setSocket(instance);

    return () => {
      instance.disconnect();
    };
  }, [url]);

  return { socket };
};
