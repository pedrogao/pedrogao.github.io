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
          "mem",
        ],
      },
      {
        text: "network",
        prefix: "network/",
        children: ["tcp-impl"],
      },
      {
        text: "os",
        prefix: "os/",
        children: ["linux-patch"],
      },
      {
        text: "distribute",
        prefix: "distribute/",
        children: ["raft", "rpc", "diskqueue", "tinymq", "distributedkv"],
      },
      {
        text: "engineering",
        prefix: "engineering/",
        children: ["tdd1", "tinybatis"],
      },
      {
        text: "database",
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
        prefix: "co/",
        children: ["sheet", "crdt1", "crdt2", "crdt3"],
      },
      {
        text: "ai",
        prefix: "ai/",
        children: ["lsm-tree"],
      },
    ],
  },
]);
