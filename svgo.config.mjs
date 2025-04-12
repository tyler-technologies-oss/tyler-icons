export default {
  plugins: [
    'removeDimensions',
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeTitle: false
        }
      }
    }
  ]
};
