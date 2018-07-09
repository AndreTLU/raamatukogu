
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
    
const BUILD_DIR = path.resolve(__dirname, './dist')
const SRC_DIR = path.resolve(__dirname, './src')
const PRODUCTION = process.env.NODE_ENV === 'production'
const VISUALIZE = process.env.visualization === 'true'

console.log('Running webpack server in ' + process.env.NODE_ENV)

const plugins = [
	new HtmlWebpackPlugin({
		// hash: DEVELOPMENT ? true : false, // if needed to force remove caching issues while in dev
		template: SRC_DIR + '/index.html'
	})
]

module.exports = {
	devtool: 'source-map',
	entry: {
		app: [SRC_DIR + '/app.js'] 
	},
	output: {
		path: BUILD_DIR,
		publicPath: PRODUCTION ? '/' : '/',
		filename: PRODUCTION ? 'js/[name].[chunkhash].js' : 'js/[name].js',
		chunkFilename: '[chunkhash].js'
	},
	plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
					loader: "babel-loader",
					options: {
						presets: ['es2015', 'react', 'stage-0']
					}
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
	devServer: {
		host: 'localhost',
		port: 80, // preferred port
		contentBase: BUILD_DIR,
		compress: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		noInfo: true,
		watchOptions: { poll: true },
		proxy: { '/': 'http://localhost:8080'}
	}
};