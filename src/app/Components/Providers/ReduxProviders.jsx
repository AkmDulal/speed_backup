"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../services/redux/store";
function ReduxProviders({ children }) {
  return (
    <>
      <Provider store={store}>
        {" "}
        <PersistGate loading={null} persistor={persistor}>
          {" "}
          {children}{" "}
        </PersistGate>
      </Provider>
    </>
  );
}

export default ReduxProviders;
