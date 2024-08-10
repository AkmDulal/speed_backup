import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
});

export const persistor = persistStore(store);

export const RootState = () => {
  return store.getState();
};

export const AppDispatch = () => {
  return store.dispatch;
};
