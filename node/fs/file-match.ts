import PATH from 'path';
import fsp from 'fs/promises';
async function dirTree(path: string, filter?, onEachFile?: Function) {
  let stat = await fsp.stat(path);
  if (stat.isFile()) {
    if (filter && filter.test(path)) {
      return { path };
    }
  } else if (stat.isDirectory()) {
    let res = { path, children: [] };
    let files = await fsp.readdir(path);

    for (let file of files) {
      let r = await dirTree(PATH.join(path, file));
      if (r != null) {
        res.children.push(r);
      }
    }
    return res;
  }
}

export { dirTree };
