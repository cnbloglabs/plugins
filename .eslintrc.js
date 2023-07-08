module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/browser'),
  ],
  overrides: [
    {
      files: [`src/**/*.[jt]s?(x)`],
      rules: { 'func-names': 'off' },
    },
  ],
  globals: {
    $: true,
  },
};
