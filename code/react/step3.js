import { createElement } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const element = createElement(
  "div",
  {
    title: "foo",
  },
  "Hello Pedro, I'am here!",
  createElement("h3", {}, "艾露恩指引我的长枪!")
);
root.render(element);
