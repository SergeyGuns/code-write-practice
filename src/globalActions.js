export const setAppMode = (store, mode) => {
  console.log({ setAppMode: mode });
  const app = { ...store.app };
  app.mode = mode;
  store.setState({ app });
};

export const setAppState = (store, newState) => {
  console.log({ store, newState });
  store.setState({ app: newState });
};

export default {
  setAppMode,
  setAppState,
};
