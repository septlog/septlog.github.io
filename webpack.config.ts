import PATH from 'path';
import webpack from 'webpack';
import HWP from 'html-webpack-plugin';
const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    index: PATH.join(__dirname, 'index'),
    'pages/portfolio/index': PATH.join(__dirname, 'pages/portfolio/index'),
  },
  output: {
    path: PATH.join(__dirname, 'docs'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: [/\.ts$/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.browser.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new HWP({
      template: PATH.join(__dirname, 'index.html'),
      chunks: ['index'],
      filename: 'index.html',
      publicPath: './',
    }),
    new HWP({
      template: PATH.join(__dirname, 'pages/portfolio/index.html'),
      chunks: ['pages/portfolio/index'],
      filename: 'pages/portfolio/index.html',
      publicPath: '../../',
    }),
  ],
};
export default config;
