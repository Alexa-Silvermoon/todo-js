const HtmlWebpack          = require('html-webpack-plugin')
const MiniCssExtract       = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

const CssMinimizer         = require('css-minimizer-webpack-plugin');
const Terser               = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: { //me limpia de las carpetas innecesarias
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/, //aqui me busca todos los html
                loader: 'html-loader', //en caso de encuentre archivos html, entonces me llama el loader
                options: { //en caso de encontrar un html, ejecuta otras cosas en automatico
                    sources: false
                }
            },
            {
                test: /\.css$/, //con esto no me dara error en el estilo css
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gift)$/, //expresion regular para evaluar imagenes
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App', //cambia el tittle del index.html de la carpeta dist que antes aparecia como <title>Webpack App</title>
            template: './src/index.html'
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/'}
            ]
        })
    ],
}