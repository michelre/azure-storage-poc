import slug from 'slug';
import R from 'ramda';

export const createSlugDirectories = (directories) => R.map(e => slug(e, { lower: true }), directories);

export const createDirectoryString = (directories) => R.reduce((acc, curr) => {
  if(acc === '') return curr;
  return `${acc}/${curr}`
}, '', directories);

export const createDirectoryStructure = (directories) => {
  const mapIndex = R.addIndex(R.map);
  return mapIndex((e, idx, arr) => createDirectoryString(R.take(idx + 1, arr)), createSlugDirectories(directories))
}

export const generateName = (filename) => {
  const re = /\((\d*)\).(pptx|pdf)$/;
  const reExec = re.exec(filename);
  if(!reExec) return filename.replace(/.(pdf|pptx)$/, "(2)$&");
  return filename.replace(re, `(${parseInt(reExec[1], 10) + 1}).$2`);
}
