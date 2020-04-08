
// to use the path we need node package which is saved here in const path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



entry: 

module.exports ={
    entry: ['./src/js/index.js'],
    output:
    {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js'
    },
    devServer:{
        contentBase: path.join(__dirname, 'dist')
     },
     plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,// test for all file using .js file
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
