module.exports = {
  /* type check */
  '**/*.ts?(x)': () => 'tsc --noEmit --pretty',

  /* lint-staged with `next lint`
  https://nextjs.org/docs/basic-features/eslint#lint-staged */
  '**/*.{js,jsx,ts,tsx}': (filenames) =>
    `next lint --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`,

  /* prettier */
  '**/*.{js,jsx,ts,tsx,css,scss,md,mdx}': 'prettier --write',

  /* stylelint */
  '**/*.{css,scss}': 'stylelint --fix',
};
