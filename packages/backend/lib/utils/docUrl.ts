import * as path from 'node:path';

import packageJson from '../../package.json' with { type: 'json' };

const docUrl = ({ filename }: ImportMeta) => {
  const url = new URL(packageJson.homepage);
  const rule = path.basename(filename, '.js');
  url.hash = '';
  url.pathname += `/blob/v${packageJson.version}/docs/rules/${rule}.md`;
  return url.toString();
};

export default docUrl;
