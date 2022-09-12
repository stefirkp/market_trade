function isBabelRegister(caller) {
  return !!(caller && caller.name === 'babel-jest');
}

module.exports = (api) => {
  const isJest = api.caller(isBabelRegister);

  const transformImports = ['transform-imports'];

  return {
    presets: ['next/babel'],
    plugins: [...(isJest ? [] : [transformImports]), '@babel/plugin-proposal-private-methods'],
  };
};
