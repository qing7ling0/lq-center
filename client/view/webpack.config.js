const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const HtmlWebpackConfig = {
	title: 'react',
	filename: 'index.html',
	template: "./src/index.html",
	hash: true,
	showErrors: true
};

const MINExt = new ExtractTextPlugin('[name].[hash:8].min.css');
const NormalExt = new ExtractTextPlugin('[name].[hash:8].css');
const SassExt = new ExtractTextPlugin('[name].[hash:8].sass.css');


module.exports = {
	mode: "development",
	entry: [
		'./src/main.tsx'
	],
	output: {
		filename: "bundle.js",
		chunkFilename: "[name].js",
		path: __dirname + "/dist"
	},

	devtool: "source-map",

	plugins: [
		MINExt,
		NormalExt,
		SassExt,
		new HtmlWebpackPlugin(HtmlWebpackConfig)
	],

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		modules: [path.resolve(__dirname, "src"), "node_modules"]
	},

	module: {
		rules: [{
				test: /\.(ts|tsx)?$/,
				use: [{
					loader: "awesome-typescript-loader",
					options: {
						useBabel: true,
						reportFiles: [
							"src/**/!(test)/*"
						]
					}
				}]
			},
			{
				test: /^(?!.*\.min).*\.css/,
				use: NormalExt.extract({
					use: [{
						loader: 'css-loader?importLoaders=1'
					}]
				})
			},
			{
				test: /(\.min)+\.css$/,
				use: MINExt.extract({
					use: [{
							loader: 'css-loader?importLoaders=1'
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true
							}
						}
					]
				}),
				exclude: path.resolve(__dirname, "node_modules")
			},
			{
				test: /\.scss$/,
				use: SassExt.extract({
					use: [{
						loader: 'css-loader?importLoaders=1'
					}, "sass-loader"]
				})
			},
			{
				test: /\.(png|jpg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				}]
			},
			{
				test: /\.(ttf|otf|woff|woff2|eot)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				}]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: path.resolve(__dirname, "node_modules"),
				use: [{
					loader: 'babel-loader'
				}],
			}
		]
	},
	devServer: {
		port: process.env.PORT || 8888,
		host: 'localhost',
		publicPath: '/',
		contentBase: path.resolve(__dirname, "src"),
		historyApiFallback: true,
		open: true,
		headers: {
			"access-control-allow-origin": "*"
		}
	}
}