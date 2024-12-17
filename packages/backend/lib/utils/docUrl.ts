import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import packageJson from '../../package.json' with { type: 'json' };

const docUrl = (meta: ImportMeta) => {
  const filename = meta.filename ?? fileURLToPath(meta.url);

  const url = new URL(packageJson.homepage);
  const rule = path.basename(filename, '.js');
  url.hash = '';
  url.pathname += `/blob/v${packageJson.version}/docs/rules/${rule}.md`;
  return url.toString();
};

export default docUrl;
