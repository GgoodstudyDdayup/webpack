const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//给css加前缀
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//不可压缩es6
const TerserPlugin = require('terser-webpack-plugin');//可压缩es6
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动跟新hash值防止缓存不跟新的情况
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清楚dist
module.exports = {
    entry: './src/index.js',
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader', // 根据图片大小，把图片优化成base64
                        options: {
                            limit: 5000000
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'AICODER 全栈线下实习', // 默认值：Webpack App
            filename: 'main.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,//是否移除注释
                removeAttributeQuotes: true // 移除属性的引号
            }
        })
    ],
    optimization: {
        minimizer: [

        ]
    }
}