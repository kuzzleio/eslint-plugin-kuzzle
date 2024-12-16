import { RuleTester } from 'eslint';
import rule from '../dist/lib/rules/array-foreach.js';

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
