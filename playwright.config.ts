import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests/modules',
  testMatch: '**/*.ts',
};

export default config;
