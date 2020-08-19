import { useEffect } from "react";
export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback, false);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useGlobalKeyPress = (callback) => {
  return useWindowEvent("keypress", callback);
};

export const useGlobalKeyDown = (callback) => {
  return useWindowEvent("keydown", callback);
};
