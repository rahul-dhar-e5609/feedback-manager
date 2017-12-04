const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

console.log('BUILD_DIR', BUILD_DIR);
console.log('SRC_DIR', SRC_DIR);

module.exports = env => {
  return {
    entry: {
      index: [SRC_DIR + '/index.js']
  //    ['babel-polyfill', './test.js'],
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js'
    },
    watch: true,
    devServer: {
      proxy: {
        '/auth/google': {
          target: 'http://[::1]:6003',
          secure:false
        },
        '/api/*':{
          target: 'http://[::1]:6003',
          secure:false
        },
		'/': {
			target: 'http://[::1]:9005',
			secure: false,
			bypass: function(req, res, proxyOptions) {
				if (req.headers.accept.indexOf('html') !== -1) {
					console.log('Skipping proxy for browser request.');
					return '/index.html';
				}
			}
		}
      },
      allowedHosts:[
        'http://[::1]:6003'
      ],
      contentBase: BUILD_DIR,
      port: 9005,
      compress: true,
      hot: true,
      open: true
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel', }
      ],
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'env']
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(scss)$/,
          use: ['css-hot-loader'].concat(extractSCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { alias: { '../img': '../public/img' } }
              },
              {
                loader: 'sass-loader'
              }
            ]
          }))
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              // loader: 'url-loader'
              loader: 'file-loader',
              options: {
                name: './img/[name].[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[hash].[ext]'
          }
        }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "REACT_APP_STRIPE_KEY": JSON.stringify("pk_test_W0AuG9dltNa50zvIKrb1GhbP")
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NamedModulesPlugin(),
      extractCSS,
      extractSCSS,
      new HtmlWebpackPlugin(
        {
          inject: true,
          template: './public/index.html'
        }
      ),
      new CopyWebpackPlugin([
          {from: './public/img', to: 'img'}
        ],
        {copyUnmodified: false}
      )
    ]
  }
};
