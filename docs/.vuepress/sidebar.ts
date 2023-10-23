import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  {
    text: "文章",
    icon: "note",
    prefix: "/posts/",
    children: [
      {
        text: "go",
        icon: "note",
        collapsible: true,
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
        collapsible: true,
        prefix: "network/",
        children: ["tcp-impl"],
      },
      {
        text: "os",
        icon: "note",
        collapsible: true,
        prefix: "os/",
        children: ["linux-patch"],
      },
      {
        text: "distribute",
        icon: "note",
        collapsible: true,
        prefix: "distribute/",
        children: ["raft", "rpc", "diskqueue", "tinymq", "distributedkv"],
      },
      {
        text: "engineering",
        icon: "note",
        collapsible: true,
        prefix: "engineering/",
        children: ["tdd1", "tinybatis"],
      },
      {
        text: "database",
        icon: "note",
        collapsible: true,
        prefix: "database/",
        children: [
          "cmu15445-1",
          "cmu15445-2",
          "cmu15445-3",
          "cmu15445-4",
          "cmu15445-5",
          "cmu15445-6",
        ],
      },
      {
        text: "collaborate",
        icon: "note",
        collapsible: true,
        prefix: "co/",
        children: ["sheet", "crdt1", "crdt2", "crdt3"],
      },
      {
        text: "ai",
        icon: "note",
        collapsible: true,
        prefix: "ai/",
        children: ["lsm-tree"],
      },
    ],
  },
]);
