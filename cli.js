#!/usr/bin/env node
"use strict";

const path = require('path');
const program = require('commander')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap
const fs = require("fs")
// const p = require("./package.json");
// const chalk = require('chalk')

const REP_NAME = 'twf'

function start () {
  let cliPath = path.join(__dirname, '../../node_modules/commitizen')
  
  fs.stat(cliPath, function (err, stat) {
    if (err || !stat.isDirectory()) {
      cliPath = path.join(__dirname, './node_modules/commitizen')
      // throw err
    }

    bootstrap({
      cliPath,
      config: {
        "path": "cz-conventional-changelog"
      }
    })
  })
}

function initHook() {
  try {
    const p = require(path.join(__dirname, '../../package.json'));
    p.husky = p.husky || {};
    p.husky.hooks = {
      'commit-msg': `node ./node_modules/${REP_NAME}/verify-commit-msg.js`
    };
    require("fs").writeFileSync('./package.json', JSON.stringify(p, null, 2) + require("os").EOL)
  } catch (err) {
    throw err
  }
}

let cmdValue;
program
.version('1.0.0')
.arguments('<cmd> [env]')
.action(function (cmd, env) {
  cmdValue = cmd;
})

program
.command('useHook')
.action(function (dir, cmd) {
  cmdValue = true;
  initHook()
  console.log('Now you can prevent bad git commit.')
})

program.parse(process.argv)
if (typeof cmdValue === 'undefined') {
  start()
}
