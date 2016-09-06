# POC - Reports storage using Azure Storage

### Install
Clone the repository, make a copy of the conf/conf.sample.json file and rename it conf.json. Provide the account name and the account key in this file.

### Start the server
```sh
PORT=5555 npm start-server
```

### List all Reports
[http://localhost:5555/reports](http://localhost:5555/reports)

[http://localhost:5555/reports?partner=climateck](http://localhost:5555/reports?partner=climateck)

### Download a Report

[http://localhost:5555/report/monthly_view-operation_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4](http://localhost:5555/report/monthly_view-operation_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4)

### Add new Report

POST [http://localhost:5555/report?partner=r-g-project&customer=stable-sites&site=m4](http://localhost:5555/report?partner=r-g-project&customer=stable-sites&site=m4)

BODY: form-data with a key report that contains the binary file

### Remove a Report
```sh
curl -X DELETE "http://localhost:5555/report/monthly_view-operation_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4"
```
