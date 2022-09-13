module.exports = {
  stories: ['../components/**/*.stories.tsx', '../components/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-next',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  // webpackFinal: async (config, { configType }) => {
  //   // add CSS modules support
  //   /**
  //    * Add *.scss support
  //    * @see https://nebulab.it/blog/nextjs-tailwind-storybook/
  //    */
  //    config.module.rules.push({
  //     test: /\.css$/,
  //     use: ['style-loader', 'css-loader', 'postcss-loader'],
  //   });

  //   return config;
  // },
};
