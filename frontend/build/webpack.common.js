const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


/**
 * `..` Since this config file is in the config folder so we need
 * to resolve path in the top level folder.
 */
const resolve = relativePath => path.resolve(__dirname, '..', relativePath)

module.exports = {
    entry: {
        'doctors-and-patients': resolve('app/index.js')
    },
    output: {
        filename: 'js/[name].js',
        // Folder where the output of webpack's result go.
        path: resolve('public'),
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        // Exchanges, adds, or removes modules while an application is running, without a full reload.
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'output.css'
        }),
        new CleanWebpackPlugin(
            ['public'],
            {
                root: resolve('.'),
                verbose: true,
                dry: false
            }
        )

    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}
