import PATH from 'path';
import fsp from 'fs/promises';
async function dirTree(path: string, filter?: RegExp, onEachFile?: Function) {
  let stat = await fsp.stat(path);
  if (stat.isFile()) {
    if (filter) {
      if (filter.test(path)) {
        return { path };
      } else {
        return null;
      }
    } else {
      return { path };
    }
  } else if (stat.isDirectory()) {
    let res = { path, children: [] };
    let files = await fsp.readdir(path);

    for (let file of files) {
      let r = await dirTree(PATH.join(path, file), filter);
      if (r != null) {
        res.children.push(r);
      }
    }
    return res;
  }
}

async function getMatchedFiles(
  path: string,
  option?: { fileFilters?: RegExp[]; dirFilters?: RegExp[] },
) {
  let stat = await fsp.stat(path);
  let fileFilters: RegExp[] = [];
  let dirFilters: RegExp[] = [];
  if (option) {
    fileFilters = option.fileFilters;
    dirFilters = option.dirFilters;
  }

  if (stat.isFile()) {
    if (fileFilters) {
      let pass = true;
      fileFilters.forEach((f) => {
        if (!f.test(path)) {
          pass = false;
        }
      });
      if (!pass) {
        return null;
      }
      return [path];
    }
    return [path];
  } else if (stat.isDirectory()) {
    if (dirFilters) {
      let pass = true;
      dirFilters.forEach((d) => {
        if (d.test(PATH.basename(path))) {
          pass = false;
        }
      });
      if (!pass) {
        return null;
      }
    }

    let res = [];
    let files = await fsp.readdir(path);

    for (let file of files) {
      let r = await getMatchedFiles(PATH.join(path, file), option);
      if (r != null) {
        res.push(...r);
      }
    }
    return res;
  }
}

export { dirTree, getMatchedFiles };
