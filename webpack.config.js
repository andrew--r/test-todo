var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: './app/scripts/index.js',
	output: {
		path: 'build',
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
				},
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
			},
		],
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
			},
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			hash: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
			},
		}),
		new ExtractTextPlugin('[name].css'),
	],
	postcss: [autoprefixer, precss],
};
