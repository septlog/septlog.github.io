import { dirTree } from './node/fs/file-match';
import PATH from 'path';
import webpack from 'webpack';
const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: PATH.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.ts$/, /.\.tsx$/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};

export default config;
