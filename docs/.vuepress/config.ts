import { defineUserConfig } from "vuepress";
import { commentPlugin } from "vuepress-plugin-comment2";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "廊中别苑",
  description:
    "我们不是在这里开发一些实用的东西，我们纯粹是为了学习而选择挑战。",
  base: "/",
  theme,
  plugins: [
    commentPlugin({
      provider: "Giscus",
      repo: "pedrogao/pedrogao.github.io",
      repoId: "R_kgDOG68Q-A",
      category: "Q&A",
      categoryId: "DIC_kwDOG68Q-M4CZ5GN",
      mapping: "pathname",
      strict: false,
      lazyLoading: true,
      reactionsEnabled: true,
      inputPosition: "bottom",
      lightTheme: "light",
    }),
  ],
});
