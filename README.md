# `@playwright/test` issue with ES modules

An example repo showing issues when trying to important an ES Module from your `@playwright/test` test file and a workaround.

## Getting Started

```console
nvm use
npm i
npx playwright install
npm test
```

You should see:

```console
❯ npm test

> playwright-test-repo@1.0.0 test
> playwright test

Using config at /Users/richardwillis/Projects/chevin/playwright-test-repo/playwright.config.ts
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /Users/richardwillis/Projects/chevin/playwright-test-repo/src/tests/modules/Example.test.ts
    at new NodeError (node:internal/errors:371:5)
    at Loader.defaultGetFormat [as _getFormat] (node:internal/modules/esm/get_format:71:15)
    at Loader.getFormat (node:internal/modules/esm/loader:105:42)
    at Loader.getModuleJob (node:internal/modules/esm/loader:243:31)
    at Loader.import (node:internal/modules/esm/loader:177:17)
    at importModuleDynamicallyWrapper (node:internal/vm/module:437:15)
    at Loader._requireOrImport (/Users/richardwillis/Projects/chevin/playwright-test-repo/node_modules/@playwright/test/lib/test/loader.js:214:52)
    at Loader.loadTestFile (/Users/richardwillis/Projects/chevin/playwright-test-repo/node_modules/@playwright/test/lib/test/loader.js:130:7)
    at Runner._run (/Users/richardwillis/Projects/chevin/playwright-test-repo/node_modules/@playwright/test/lib/test/runner.js:219:40) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
```

... because we're doing `import { importFromEsModule } from '../../../ESModule';` in one of our test files.

## Workaround

@playwright/test doesn't support automatic typescript transpilation for esm modules so we need to manually compile ourselves.

Our compilation target module type MUST be `commonjs` UNLESS we change all our import paths (see <https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#esm-nodejs>).

Run `npm run test:fix` to see the workaround:

```console
❯ npm run test:fix

> playwright-test-repo@1.0.0 pretest:fix
> tsc --incremental -p tests/tsconfig.json


> playwright-test-repo@1.0.0 test:fix
> playwright test -c tests-out


Running 1 test using 1 worker

  ✓  ../tests/Example.test.ts:7:5 › basic test (1s)


  1 passed (2s)
```

The above script has a pre-script hook: `"pretest:fix": "tsc --incremental -p tests/tsconfig.json",` which compiles the test files into commonjs modules which `@playwright/test` runs.
