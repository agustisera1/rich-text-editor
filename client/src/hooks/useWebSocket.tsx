import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

/**
 * Custom hook to manage a WebSocket connection using socket.io-client.
 *
 * @param {string} url - The URL to establish the WebSocket connection.
 * @returns {{ socket: Socket | null }} - An object containing the WebSocket instance.
 *
 * @example
 * const { socket } = useWebSocket("http://localhost:3000");
 *
 * @remarks
 * This hook initializes a WebSocket connection when the component mounts and
 * cleans up the connection when the component unmounts or the URL changes.
 *
 * @enhancement
 * Provide an interface to attach events to the socket instead of subscribing
 * manually with useEffects in the client components.
 *
 * @see https://socket.io/docs/v4/client-api/#io-url-options
 */

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
