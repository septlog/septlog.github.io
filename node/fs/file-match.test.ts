import { dirTree } from './file-match';
dirTree('./', /\.ts$/).then((r) => {
  console.log(r);
});
