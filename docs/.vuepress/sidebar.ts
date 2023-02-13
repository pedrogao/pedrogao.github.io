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
          "mem",
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
        text: "os",
        icon: "note",
        collapsable: true,
        prefix: "os/",
        children: ["linux-patch"],
      },
      {
        text: "distribute",
        icon: "note",
        collapsable: true,
        prefix: "distribute/",
        children: ["raft"],
      },
      {
        text: "engineering",
        icon: "note",
        collapsable: true,
        prefix: "engineering/",
        children: ["tdd1"],
      },
    ],
  },
]);
