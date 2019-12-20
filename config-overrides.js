const { addWebpackPlugin } = require("customize-cra")

module.exports = {
  override() {
    addWebpackPlugin(["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }])
  }
}