module.exports = {
  '*.{ts,tsx}': [
    () => 'bash -c tsc --incremental false --noEmit',
    'eslint --fix',
    'prettier --write',
  ],
};
