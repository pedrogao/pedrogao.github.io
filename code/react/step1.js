import { createElement } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const element = <h3 title="foo">Hello Pedro, I'am here!</h3>;
root.render(element);
