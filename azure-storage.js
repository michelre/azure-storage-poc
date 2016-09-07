import azure from 'azure-storage';
import Promise from 'bluebird';
import co from 'co';
import fs from 'fs';
import R from 'ramda';

import conf from './conf';
import { createDirectoryStructure, generateName } from './utils';

const { 'azure-storage': azureStorage } = conf;

const key = azureStorage['account-key'];
const accountName = azureStorage['account-name'];

const fileService = Promise.promisifyAll(azure.createFileService(accountName, key));
const unlink = Promise.promisify(fs.unlink);

export const uploadFile = ({ originalname, path }, directories) => {
  const dirStructure = createDirectoryStructure(directories)
  return co(function* (){
    yield fileService.createShareIfNotExistsAsync('reports');
    for(let i = 0; i < dirStructure.length; i++){
      yield fileService.createDirectoryIfNotExistsAsync('reports', dirStructure[i]);
    }
    const { exists } = yield fileService.doesFileExistAsync('reports', R.last(dirStructure), originalname);
    yield fileService.createFileFromLocalFileAsync('reports', R.last(dirStructure), originalname, path);
    yield unlink(path);
  });
};

export const getReport = (directories,report, writeStream) => {
  const dir = R.last(createDirectoryStructure(directories));
  return fileService.getFileToStreamAsync('reports', dir, report, writeStream);
};

export const listReports = (directories) => {
  const dir = R.last(createDirectoryStructure(R.filter(dir => dir, directories)));
  const p = fileService.listFilesAndDirectoriesSegmentedAsync('reports', dir, null);
  return p.then(({ entries }) => entries);
};

export const deleteReport = (reportPath) => {
  const dir = createDirectoryStructure(R.take(reportPath.length -1, reportPath));
  return fileService.deleteFileIfExistsAsync('reports', R.last(dir), R.last(reportPath))
};
