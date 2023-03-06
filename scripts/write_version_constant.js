#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const packageJson = require(path.join(__dirname, "..", "package.json"));

const version = packageJson.version;
const versionContent = `\
// modified by build process.
export const VERSION = '${version}'
`;

fs.writeFileSync(
  path.join(__dirname, "..", "src", "version.ts"),
  versionContent
);
