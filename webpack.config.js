const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  mode: 'development',
  entry: {
    index:'./src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  devtool:'inline-source-map',
  plugins:[
    new HtmlWebpackPlugin({      
      hash: true,
      title: 'IP Address Tracker',
      template: './src/index.html',
      filename: './index.html',
      favicon: "./src/images/favicon-32x32.png"  
    }), 
      new CleanWebpackPlugin({cleanStaleWebpackAssets:false}),
      new MiniCssExtractPlugin({
        filename:'[name].css',
        chunkFilename:'[id].css'
      }),
  ],
  resolve:{
    alias: {
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
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader, 
                options: {
                    publicPath: ''
                }
            },
            {
                loader: "css-loader"
            }
            ],
          },
          {

            test: /\.(png|svg|jpg|jpeg|gif)$/i,
    
            use: [{
              loader:'file-loader',
              options:{minimize:true}}],
    
          },
        {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader'
            }
        },
          {

            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            use: {
              loader: 'url-loader',
            },
    
          },
    ],
  },
};