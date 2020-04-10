
// to use the path we need node package which is saved here in const path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



entry: 

module.exports ={
    entry: ['./src/js/index.js'],
    output:
    {
        // here the path should be only directory like dist but not dist/js because if we write dist/js it will try to inject html file into the same folder called dist/js and our index.html is not in js but in dist/js 
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
