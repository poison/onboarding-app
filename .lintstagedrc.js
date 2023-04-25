const path = require('path');

const buildEslintCommand = filenames =>
  `npx eslint ${filenames.map(f => path.relative(process.cwd(), f)).join(' ')}`;

const buildTscCommand = () => 'tsc --noEmit';

module.exports = {
  // tsc for type checking (run full tsc to avoid breaking other files)
  '*.{ts,tsx}': [buildTscCommand],

  // lint on everything
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
