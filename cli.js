#!/usr/bin/env node

require = require("esm")(module)

const meow = require("meow")
const updateNotifier = require("update-notifier")
const prompt = require("./lib/prompt").default
const { readFileSync, existsSync } = require("fs")

const cli = meow(`
  Usage
    ❯ promptconfig <JSON configuration file>

  Example
    ❯ promptconfig prompt.json > prompt.bash
`)

updateNotifier({ pkg: cli.pkg }).notify()

let file = cli.input[0]

if (file) {
  if (!existsSync(file)) {
    console.error("That configuration file does not exist.")
    process.exit(1)
  }

  let json = readFileSync(file).toString()
  let configuration = JSON.parse(json)

  try {
    var bash = prompt({ options: configuration })
  } catch(error) {
    console.error(error.message)
    process.exit(1)
  }

  console.log(bash)
} else {
  cli.showHelp()
}
