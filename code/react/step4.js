const element1 = {
  type: "div",
  props: {
    title: "foo",
  },
  children: ["Hello Pedro, I'am here!"],
};

const node = document.createElement(element1.type);
node["title"] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element1.children[0];

node.appendChild(text);
const container = document.getElementById("test");
container.appendChild(node);
