const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index:'./src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {

    contentBase: './dist',

  },
  devtool:'inline-source-map',
  plugins:[
    new HtmlWebpackPlugin({      
      title: 'webpack Boilerplate',      
      template: path.resolve(__dirname, './src/index.html'), 
      filename:"index.html"}), 
      new CleanWebpackPlugin({cleanStaleWebpackAssets:false}),
  ],
  resolve:{alias: {
    "./images/layers.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers.png"
    ),
    "./images/layers-2x.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/layers-2x.png"
    ),
    "./images/marker-icon.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon.png"
    ),
    "./images/marker-icon-2x.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-icon-2x.png"
    ),
    "./images/marker-shadow.png$": path.resolve(
        __dirname,
        "./node_modules/leaflet/dist/images/marker-shadow.png"
    )
    }},
  module:{
      rules:[
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/i,
            use:['style-loader', 'css-loader'],
          },
          {
            test: /\.(gif|svg|jpg|png)$/,
            loader: "file-loader",
          },
          {

            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
    
          },
    ],
  },
};