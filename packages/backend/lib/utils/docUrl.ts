import { readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pj = resolve(__dirname, '../..', 'package.json');
const pkg = JSON.parse(readFileSync(pj, 'utf8'));

const docUrl = (meta: ImportMeta) => {
  const filename = meta.filename ?? fileURLToPath(meta.url);

  const url = new URL(pkg.homepage);
  const rule = basename(filename, '.js');
  url.hash = '';
  url.pathname += `/blob/v${pkg.version}/docs/rules/${rule}.md`;
  return url.toString();
};

export default docUrl;
