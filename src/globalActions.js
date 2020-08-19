export const setAppMode = (store, mode) => {
  const app = { ...store.app };
  app.mode = mode;
  store.setState({ app });
};

export const setAppCurrentLesson = (store, currentLesson) => {
  store.setState({ app: { ...store.app, currentLesson } });
};

export const setAppState = (store, newState) => {
  store.setState({ app: newState });
};

export default {
  setAppMode,
  setAppState,
  setAppCurrentLesson,
};
