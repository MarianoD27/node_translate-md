#! /usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers"
import chalk from "chalk";
import boxen from "boxen";
import { translate } from "@vitalets/google-translate-api";

import { handleCommandTranslate, showAll } from "./utils.js";

const usage = chalk.keyword('violet')("\nUsage: tran <lang_name> sentence to be translated");

const argv = yargs(hideBin(process.argv))
  .scriptName("trans")
  .usage(usage)
  .help(true)
  .alias('h', 'help')
  .command({
    command: 'list',
    describe: "Lists all the available languages",
    handler: function (argv) {
      showAll();
    }
  })
  .command({
    command: '*',
    describe: "Translate to another language",
    builder: {
      l: {
        describe: "Language",
        demandOption: false,
        type: "string"
      },
      t: {
        describe: "Text to translate",
        demandOption: false,
        type: 'string'
      },
      list: {
        describe: "List all the available languages",
        demandOption: false,
        type: 'boolean'
      }
    },
    handler: function (argv) {
      handleCommandTranslate(argv)
    }

  }).argv

