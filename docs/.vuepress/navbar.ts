import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "归档",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "go",
        prefix: "go/",
        children: [
          "helloworld",
          "plan9",
          "generics",
          "pool",
          "magic",
          "magic2",
        ],
      },
      {
        text: "network",
        prefix: "network/",
        children: ["tcp-impl"],
      },
      {
        text: "distribute",
        prefix: "distribute/",
        children: ["raft"],
      },
      {
        text: "frontend",
        prefix: "frontend/",
        children: ["tiny-react"],
      },
    ],
  },
]);
