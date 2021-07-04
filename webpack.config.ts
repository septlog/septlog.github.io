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
};

export default config;
