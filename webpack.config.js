module.exports = {

  context: __dirname + "",
  entry: {
    javascript: "./demo/main.js"
  },

  output: {
    filename: "ui.js",
    path: __dirname + "/dist",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "react-hot-loader",
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: [ "parcelify-loader" ],
        include: __dirname + "/src"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
          {
            presets:['es2015', 'react'],
            plugins:['transform-class-properties']
          }
      },
      // {
      //   test: /\.html$/,
      //   loader: "file?name=[name].[ext]",
      // },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
}
