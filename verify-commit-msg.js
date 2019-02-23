const chalk = require('chalk')
const msgPath = process.env.HUSKY_GIT_PARAMS
console.log(msgPath)
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
    chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
    `    ${chalk.green(`feat(options): 增加XX功能`)}\n` +
    `    ${chalk.green(`fix(login): 部分用户登录失败 (close #TAPD_BUG_ID)`)}\n\n` +
    chalk.red(`  参考commit 规则 cz-conventional-changelog \n`) +
    chalk.red(`  建议使用 ${chalk.cyan(`twf`)} 按提示来生成commit.\n`)
  )
  process.exit(1)
}
