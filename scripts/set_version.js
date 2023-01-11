#! /usr/bin/env node

let fs = require("fs");

const args = process.argv.slice(2);
const version = args[0] ?? "SNAPSHOT-main";

const path = __dirname + "/../package.json";

if (!fs.existsSync(path)){
	console.log("package.json does not exist");
	return;
}

let json;

try {

	const fileContents = fs.readFileSync(path);

	json = JSON.parse(fileContents.toString());

} catch (e){
	console.log("package.json is invalid: " + e.message);
	return;
}

json.version = version;

try {
	fs.writeFileSync(path, JSON.stringify(json, null, 2));
} catch (e){
	console.log("Failed to write package.json: " + e.message);
}