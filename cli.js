#!/usr/bin/env node
"use strict";

const path = require('path');
const program = require('commander')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap
// const p = require("./package.json");
const chalk = require('chalk')

const REP_NAME = 'twf'

function start () {
  bootstrap({
    cliPath: path.join(__dirname, '../../node_modules/commitizen'),
    config: {
      "path": "cz-conventional-changelog"
    }
  })
}

function initHook() {
  var p = require('./package.json');
  p.husky = p.husky || {};
  p.husky.hooks = {
    'commit-msg': `./node_modules/${REP_NAME}/index.js`
  };
  require("fs").writeFileSync('./package.json', JSON.stringify(p, null, 2) + require("os").EOL)
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
