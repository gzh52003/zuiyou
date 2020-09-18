const path = require("path");
const { injectBabelPlugin } = require("react-app-rewired");
const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
  fixBabelImports,
} = require("customize-cra");

module.exports = override(
  addDecoratorsLegacy(), //支持ES7装饰器
  addWebpackAlias({
    "@": path.join(__dirname, "src"), // D:\app\xx, /app/xxx
    "#": path.join(__dirname, "src/components"),
    "~": path.join(__dirname, "src/views"),
  }),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css", // `style: true` 会加载 less 文件
  })
);
