import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import baseConfig from './base.js';
import typescriptConfig from './typescript.js';

/**
 * The full Kuzzle Vue standard: the shared rules, the Vue-aware TypeScript
 * parser setup, then the TypeScript rules.
 */
const defaultConfig = defineConfigWithVueTs(
  ...baseConfig,
  vueTsConfigs.recommended,
  ...typescriptConfig,
);

export default defaultConfig;
