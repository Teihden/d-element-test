module.exports = {
  map: process.env.NODE_ENV === 'development' ? 'inline' : false,
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      features: {
        'custom-properties': false,
      },
    },
    cssnano: process.env.NODE_ENV === 'production' ? { preset: 'default' } : false,
  },
};
