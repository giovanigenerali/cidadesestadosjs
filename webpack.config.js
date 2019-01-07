const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/app.js',
	output: {
		library: 'CidadesEstados',
		libraryTarget: 'umd',
		libraryExport: 'CidadesEstados',
		path: path.resolve(__dirname, 'dist'),
		filename: 'CidadesEstados.min.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}]
	},
	optimization: {
    minimizer: [new UglifyJsPlugin()],
	},
	plugins: [
    new CopyWebpackPlugin([
			{ from: 'src/json/', to: 'json/' },
			{ from: 'src/app.js', to: 'CidadesEstados.js' },
		])
  ]
};
