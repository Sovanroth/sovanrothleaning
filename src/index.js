import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "../src/redux/store";
import { Provider } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import { PersistGate } from "redux-persist/lib/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Suspense fallback={<LoadingScreen />}>
  <Provider store={store}>
    {/* <PersistGate loading={<LoadingScreen />} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>
  // </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
