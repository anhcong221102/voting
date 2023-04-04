module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@api': './src/api',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@actions': './src/redux/actions',
          '@reducers': './src/redux/reducers',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};