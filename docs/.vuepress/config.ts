import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "廊中别苑",
  description:
    "我们不是在这里开发一些实用的东西，我们纯粹是为了学习而选择挑战。",
  base: "/",
  theme,
  plugins: [
    searchProPlugin({
      indexContent: true,
      autoSuggestions: true,
    }),
  ],
});
