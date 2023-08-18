import { createRoot } from "react-dom/client";
import { App } from "./App";

function renderInBrowser() {
  const root = document.getElementById("root");
  createRoot(root).render(<App />);
}

renderInBrowser();
