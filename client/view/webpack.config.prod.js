const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebpackConfig = {
	title: 'hexo',
	filename: 'index.html',
	template: "./src/index.html",
	hash: true,
	showErrors: true,
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		useShortDoctype: true,
		removeEmptyAttributes: true,
		removeStyleLinkTypeAttributes: true,
		keepClosingSlash: true,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true
	},
};

const MINExt = new ExtractTextPlugin('[name].[hash:8].min.css');
const NormalExt = new ExtractTextPlugin('[name].[hash:8].css');
const SassExt = new ExtractTextPlugin('[name].[hash:8].sass.css');

const plugins = [
	new OfflinePlugin({}),
	new HtmlWebpackPlugin(HtmlWebpackConfig)
];

if (process.env.BUILD_ANALYZER) {
	plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
	mode: "production",
	entry: [
		'./src/main.tsx'
	],
	output: {
		filename: "bundle.js",
		chunkFilename: "[name].js",
		path: __dirname + "/dist"
	},

	devtool: "source-map",

	plugins: plugins,

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
				})
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
	}
}