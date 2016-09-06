import azure from 'azure-storage';
import Promise from 'bluebird';
import co from 'co';
import fs from 'fs';

import conf from './conf';

const { 'azure-storage': azureStorage } = conf;

const key = azureStorage['account-key'];
const accountName = azureStorage['account-name'];

const blobService = Promise.promisifyAll(azure.createBlobService(accountName, key));
const unlink = Promise.promisify(fs.unlink);

export const uploadFile = ({ originalname, path }, directoryPath) => {
  return co(function* (){
    yield blobService.createContainerIfNotExistsAsync('reports');
    yield blobService.createBlockBlobFromLocalFileAsync('reports', `${directoryPath}/${originalname}`, path);
    yield unlink(path);
  });
};

export const getReport = (report, writeStream) =>
  blobService.getBlobToStreamAsync('reports', report, writeStream);

export const listReports = (...args) => {
  const filteredArgs = args.filter(e => e)
  if(filteredArgs.length > 0){
    return blobService.listBlobsSegmentedWithPrefixAsync('reports', filteredArgs.join('/'), null)
      .then(({ entries }) => entries);
  }
  return blobService.listBlobsSegmentedAsync('reports', null)
    .then(({ entries }) => entries);
}

export const deleteReport = (report) =>
  blobService.deleteBlobAsync('reports', report)
