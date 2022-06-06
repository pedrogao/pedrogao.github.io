const TEXT_ELEMENT = "TEXT_ELEMENT";

function render(element, container) {
  // dom
  const dom =
    element.type === TEXT_ELEMENT
      ? document.createTextNode("")
      : document.createElement(element.type);
  // props
  Object.keys(element.props).forEach((name) => {
    dom[name] = element.props[name];
  });
  if (element.children) {
    element.children.forEach((child) => {
      render(child, dom);
    });
  }
  container.appendChild(dom);
}

function createElement(type, props, ...children) {
  return {
    type,
    props,
    children: children.map((child) =>
      typeof child === "object" ? child : createTextElement(child)
    ),
  };
}

function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const Tiny = { createElement, render };

/** @jsxRuntime classic */
/** @jsx Tiny.createElement */
const node = (
  <div style="background: orange">
    <h1>Hello JSX</h1>
    <h2 style="text-align:center">from Tiny</h2>
  </div>
);

// console.log(node);

const container = document.getElementById("test");
Tiny.render(node, container);
