const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: __dirname,
	target: 'web',
	entry: path.resolve(__dirname, './app/src/main.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
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
					path.resolve(__dirname, 'app'),
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
			path.resolve(__dirname, 'app'),
		],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
	},
	devServer: {
		contentBase: path.join(__dirname, 'app'),
		hot: true,
		open: true,
		inline: true,
		historyApiFallback: true,
	},
	performance: {
		hints: false,
	},
	devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false,
			},
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
	]);
} else if (process.env.NODE_ENV ===  'development') {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.HotModuleReplacementPlugin(),
	]);
}
