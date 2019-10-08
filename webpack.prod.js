const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//给css加前缀
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//不可压缩es6
const TerserPlugin = require('terser-webpack-plugin');//可压缩es6
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动跟新hash值防止缓存不跟新的情况
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清楚dist
const merge = require('webpack-merge')
const common = require('./webpack.common')
let prodConfig = {
    mode: 'production',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                    ,
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] }) // 添加前缀
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash].css',
            chunkFilename: '[id][hash].css'
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),//压缩js
            new OptimizeCSSAssetsPlugin({})//压缩css
        ]
    }
}
module.exports = merge(common,prodConfig)