import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../lib/rules/no-then.js';

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run('no-then', rule, {
  valid: [
    {
      code: 'async () => { await promise }',
      languageOptions: { ecmaVersion: 2018 },
    },
    {
      code: 'async () => { try { await promise } catch (e) { throw e } }',
      languageOptions: { ecmaVersion: 2018 },
    },
  ],
  invalid: [
    {
      code: 'promise.then(() => {})',
      languageOptions: { ecmaVersion: 2018 },
      errors: [
        {
          message: 'Prefer async/await to Promise.then()',
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'promise.catch(() => {})',
      languageOptions: { ecmaVersion: 2018 },
      errors: [
        {
          message: 'Prefer async/await to Promise.catch()',
          type: 'Identifier',
        },
      ],
    },
  ],
});
