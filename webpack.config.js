const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MAIN_PATH = path.resolve(__dirname, './src/main.js');
const DIST_PATH = path.resolve(__dirname, './dist');
const SRC_PATH = path.resolve(__dirname, './src');
const API_LOCAL = 'http://localhost:7000/api';
const API_SERVER = 'https://marvel-server-api.herokuapp.com/api';

module.exports = env => {
	const API_URL = JSON.stringify(env.dev ? API_LOCAL : API_SERVER);
	return {
		target: 'web',
		entry: MAIN_PATH,
		output: {
			path: DIST_PATH,
			publicPath: '/',
			filename: 'js/build.js',
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						loaders: {
							scss: 'vue-style-loader!css-loader!sass-loader',
							sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
						},
					},
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					include: [
						SRC_PATH,
					],
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]',
					},
				},
			],
		},
		resolve: {
			modules: [
				'node_modules',
				SRC_PATH,
			],
			alias: {
				vue$: 'vue/dist/vue.esm.js',
			},
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: env.prod,
				compress: {
					warnings: false,
				},
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: env.prod,
			}),
			new HtmlWebpackPlugin({
				template: path.join(SRC_PATH, 'index.html'),
				path: DIST_PATH,
				filename: 'index.html',
			}),
			new webpack.DefinePlugin({
				API_URL,
			}),
		],
		devServer: {
			contentBase: SRC_PATH,
			open: true,
		},
		performance: {
			hints: false,
		},
		devtool: env.prod ? '#source-map' : '#eval-source-map',
	};
};
