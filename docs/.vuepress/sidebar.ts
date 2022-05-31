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
    ],
  },
]);
