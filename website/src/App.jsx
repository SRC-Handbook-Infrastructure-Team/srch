// src/App.jsx
import "./styles/App.css";

import { Provider } from "./components/ui/provider"
import { useEffect } from "react";
import AppRoutes from "./AppRoutes";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
