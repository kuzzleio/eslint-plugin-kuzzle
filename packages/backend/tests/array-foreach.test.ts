import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../lib/rules/array-foreach.js';

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run('array-foreach', rule, {
  valid: [
    {
      code: 'for (const el of els) { el }',
      languageOptions: { ecmaVersion: 2018 },
    },
    {
      code: 'els.map(el => el)',
      languageOptions: { ecmaVersion: 2018 },
    },
    { code: 'forEach()' },
    // `forEach` here is a variable holding the key, not a `.forEach()` call.
    {
      code: 'obj[forEach](el => el)',
      languageOptions: { ecmaVersion: 2018 },
    },
  ],
  invalid: [
    {
      code: 'els.forEach(el => el)',
      languageOptions: { ecmaVersion: 2018 },
      errors: [
        {
          message: 'Prefer for...of instead of Array.forEach',
          type: 'CallExpression',
        },
      ],
    },
  ],
});
