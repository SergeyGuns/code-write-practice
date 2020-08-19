import React from "react";
import actions from "./globalActions";

function setState(newState) {
  this.state = { ...this.state, ...newState };
  console.log({ newState });
  this.listeners.forEach((listener) => {
    listener(this.state);
  });
}

function useCustom(React) {
  const newListener = React.useState()[1];
  React.useEffect(() => {
    this.listeners.push(newListener);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== newListener
      );
    };
  }, []);
  return [this.state, this.actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === "function") {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === "object") {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useGlobalHook = (React, initialState, actions) => {
  const store = { state: initialState, listeners: [] };
  store.setState = setState.bind(store);
  store.actions = associateActions(store, actions);
  return useCustom.bind(store, React);
};

const initState = {};

const useGlobal = useGlobalHook(React, initState, actions);

export default useGlobal;
