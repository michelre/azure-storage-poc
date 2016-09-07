# POC - Reports storage using Azure Storage

### Introduction
The file-storage branch use the File service from Azure Storage

### Install
```sh
$ git clone https://github.com/michelre/azure-storage-poc.git
$ cd azure-storage-poc && git checkout file-storage
$ npm install
$ cp conf/conf.sample.json conf/conf.json
```
Provide the account name and the account key within the conf.json file.

### Start the server
```sh
$ PORT=5555 npm start-server
```

### Unit tests

```sh
$ npm run test
```

### List all files and directories

#### GET /reports?country=<XXX>&partner=<XXX>&customer=<XXX>&site=<XXX>&type=<XXX>

Requête:
```sh
curl -X GET -H "Authorization: Basic Zm9vOmJhcg==" "http://127.0.0.1:5555/reports?country=france"
```
Response:
```json
{"files":[],"directories":[{"name":"r-g-project"}]}
```

Requête:
```sh
curl -X GET -H "Authorization: Basic Zm9vOmJhcg==" "http://127.0.0.1:5555/reports?country=france&partner=r%20g%20project&customer=stable-sites&site=m4&type=multi"
```
Response:
```json
{"files":[{"name":"monthly_improve-energy-and-operation_ecole-des-arts_fr_2016-08-01_2016-08-31.pdf","contentLength":"263112"}],"directories":[]}
```

### Download a Report

#### GET /report/:reportName?country=<XXX>&partner=<XXX>&customer=<XXX>&site=<XXX>&type=<XXX>

```sh
curl -X GET -H "Authorization: Basic Zm9vOmJhcg==" "http://127.0.0.1:5555/report/monthly_improve-energy-and-operation_ecole-des-arts_fr_2016-08-01_2016-08-31.pdf?country=france&partner=r%20g%20project&customer=stable-sites&site=m4&type=multi" > report.pdf
```

### Add new Report

#### POST /report?country=<XXX>&partner=<XXX>&customer=<XXX>&site=<XXX>&type=<XXX>
BODY: form-data with a key report that contains the binary file
```sh
curl -X POST -H "Authorization: Basic Zm9vOmJhcg==" -H "Content-Type: multipart/form-data" -F "report=@" "http://localhost:5555/report?country=France&partner=r%20g%20project&customer=stable-sites&site=m4&type=multi"
```

### Remove a Report

#### DELETE /report/:reportName?country=<XXX>&partner=<XXX>&customer=<XXX>&site=<XXX>&type=<XXX>

```sh
curl -X DELETE -H "Authorization: Basic Zm9vOmJhcg==" "http://localhost:5555/report/monthly_improve-energy-and-operation_ecole-des-arts_fr_2016-08-01_2016-08-31.pdf?country=France&partner=r%20g%20project&customer=stable-sites&site=m4&type=multi"
```
