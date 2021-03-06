import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  // "/slide",
  {
    text: "文章",
    icon: "note",
    prefix: "/posts/",
    children: [
      {
        text: "go",
        icon: "note",
        collapsable: true,
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
        icon: "note",
        collapsable: true,
        prefix: "network/",
        children: ["tcp-impl"],
      },
      {
        text: "distribute",
        icon: "note",
        collapsable: true,
        prefix: "distribute/",
        children: ["raft"],
      },
      {
        text: "frontend",
        icon: "note",
        collapsable: true,
        prefix: "frontend/",
        children: ["tiny-react"],
      },
    ],
  },
]);
