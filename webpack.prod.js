import { merge } from 'webpack-merge';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import common from './webpack.common.js';

export default merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin()],
	optimization: {
		minimizer: ['...', new CssMinimizerPlugin()],
	},
});
