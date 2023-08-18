module.exports = {
  htmlWhitespaceSensitivity: "ignore",
  overrides: [
    {
      files: "*.ts",
      options: {
        tabWidth: 2,
        useTabs: true,
        singleQuote: true,
        trailingComma: "all",
        printWidth: 140,
        semi: false,
      },
    },
    {
      files: "*.scss",
      options: {
        printWidth: 140,
      },
    },
  ],
};
