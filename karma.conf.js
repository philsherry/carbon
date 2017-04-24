var path = process.cwd(),
    specPath = path + '/src/***/**/__spec__.js',
    srcPath = path + '/src/***/**/!(__spec__).js',
    preprocessors = {};

preprocessors[specPath] = ['webpack'];

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],

    files: [
      './src/components/decimal/__spec__.js'
    ],

    frameworks: ['jasmine', 'es5-shim'],

    preprocessors: preprocessors,

    reporters: ['progress', 'coverage'],

    singleRun: true,

    coverageReporter: {
      dir: './coverage',
      fixWebpackSourcePaths: true,
      reporters: [
        { type : 'text-summary' },
        { type : 'html' }
      ],
    },

    webpack: {
      node: {
        fs: 'empty'
      },
      resolve: {
        modules: ['node_modules', 'src']
      },
      module: {
        rules: [
          {
            test: /\.js?$/,
            enforce: 'pre',
            exclude: [/node_modules/, path + '/src/***/**/__spec__.js'] ,
            loader: 'isparta-loader'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
              presets:['es2015', 'react'],
              plugins:['transform-class-properties']
            }
          }
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
