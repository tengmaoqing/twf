## 定制项目工作流，最佳实践

> 定制 **git commit 格式**、**eslint config**

#### Installing the command line tool

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install twf -g
```

#### Using the command line tool
Now, simply use `twf` instead of `git commit` when committing.

_Alternatively_, if you are using **NPM 5.2+** you can [use `npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) instead of installing globally:
```
npm install twf -D
npx twf
```

or as an npm script:
```json
  ...
  "scripts": {
    "commit": "npx twf"
  }
```

#### Add git hooks
```
npx twf addHook
```

Then, the code about hooks will be inserted into the `package.json`. 

You can custom `commit-msg rule` by change the file path of `husky.hooks.commit-msg` in `package.json`.

#### Add eslint config
```
npx twf eslint
```
Generate eslint configuration file that i like
