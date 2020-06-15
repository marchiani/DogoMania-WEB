const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, argv) => {
	const PATH = {
		src: path.join(__dirname, 'src'),
		dist: path.join(__dirname, 'dist', argv.sub),
		assets: 'assets/',
	};

	const PATH_RESOLVE = path.resolve(PATH.src, 'apps', argv.sub);

	return {
		resolve: {
			modules: [PATH_RESOLVE, PATH.src, 'node_modules'],
			extensions: ['.js', '.jsx', '.css', '.sass'],
			symlinks: false,
			alias: {
				'react-dom': '@hot-loader/react-dom',
			},
		},
		// BASE config
		externals: {
			paths: PATH,
		},
		entry: [
			path.resolve(PATH_RESOLVE, 'index.jsx'),
		],
		devServer: {
			contentBase: PATH.dist,
			publicPath: '/',
			port: 9090,
		},
		output: {
			path: PATH.dist,
			filename: 'index.js',
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
					},
				},
				{
					test: /\.module\.s(a|c)ss$/,
					loader: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					test: /\.s(a|c)ss$/,
					exclude: /\.module.(s(a|c)ss)$/,
					loader: [
						'style-loader',
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				__ENVIRONMENT__: JSON.stringify(argv.environment),
				__IS_DEV__: argv.mode === 'development',
				__BUILD_TIME__: JSON.stringify((new Date()).toISOString()),
			}),
			new MiniCssExtractPlugin({
				filename: 'index.css',
			}),
			new HtmlWebpackPlugin({
				favicon: 'src/assets/Logo.jpg',
				template: path.resolve(PATH_RESOLVE, 'index.html'),
			}),
			new webpack.NamedModulesPlugin(),
		],
		mode: argv.mode,
		devtool: (argv.mode === 'development') ? 'cheap-module-eval-source-map' : false,
	};
};
