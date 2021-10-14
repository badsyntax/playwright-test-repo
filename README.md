# `@playright/test` issue with ES modules

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

> playright-test-repo@1.0.0 test
> playwright test

Using config at /Users/richardwillis/Projects/chevin/playright-test-repo/playwright.config.ts
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /Users/richardwillis/Projects/chevin/playright-test-repo/src/tests/modules/Example.test.ts
    at new NodeError (node:internal/errors:371:5)
    at Loader.defaultGetFormat [as _getFormat] (node:internal/modules/esm/get_format:71:15)
    at Loader.getFormat (node:internal/modules/esm/loader:105:42)
    at Loader.getModuleJob (node:internal/modules/esm/loader:243:31)
    at Loader.import (node:internal/modules/esm/loader:177:17)
    at importModuleDynamicallyWrapper (node:internal/vm/module:437:15)
    at Loader._requireOrImport (/Users/richardwillis/Projects/chevin/playright-test-repo/node_modules/@playwright/test/lib/test/loader.js:214:52)
    at Loader.loadTestFile (/Users/richardwillis/Projects/chevin/playright-test-repo/node_modules/@playwright/test/lib/test/loader.js:130:7)
    at Runner._run (/Users/richardwillis/Projects/chevin/playright-test-repo/node_modules/@playwright/test/lib/test/runner.js:219:40) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
```

... because we're doing `import { importFromEsModule } from '../../../ESModule';` in one of our test files.

## A workaround?

Example coming soon!
