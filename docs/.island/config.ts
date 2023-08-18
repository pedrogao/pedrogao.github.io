import { defineConfig } from "islandjs";

export default defineConfig({
  themeConfig: {
    nav: [
      {
        text: "Home",
        link: "/",
      },
    ],
    sidebar: {
      "/": [
        {
          text: "文章列表",
          items: [
            {
              text: "magic",
              link: "/go/magic",
            },
            {
              text: "magic1",
              link: "/go/magic2",
            },
          ],
        },
      ],
    },
  },
});
