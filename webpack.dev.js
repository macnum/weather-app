import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	devServer: {
		static: './dist',
		port: 3000,
		watchFiles: ['./src/index.html', './src/*'],
		open: true,
		compress: true,
	},
});
