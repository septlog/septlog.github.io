import { dirTree, getMatchedFiles } from './file-match';
dirTree('./').then((r) => {
  console.log(r);
});

getMatchedFiles('./', {
  fileFilters: [/\.ts$/],
  dirFilters: [/node_modules/, /node/],
}).then((r) => {
  console.log(r);
});
