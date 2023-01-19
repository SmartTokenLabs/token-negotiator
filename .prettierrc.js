module.exports = {
  "htmlWhitespaceSensitivity": "ignore",
  "pluginSearchDirs": ["."],
  "overrides": [
    {
      "files": "*.ts",
      "options": {
        "tabWidth": 2,
        "useTabs": true,
        "singleQuote": true,
        "trailingComma": "all",
        "printWidth": 120,
        "semi": false
      }
    },
    {
      "files": "*.scss",
      "options": {
        "printWidth": 140
      }
    }
  ]
}