# POC - Reports storage using Azure Storage

### List all Reports
[http://localhost:5555/reports](http://localhost:5555/reports)

[http://localhost:5555/reports?partner=climateck](http://localhost:5555/reports?partner=climateck)

### Download a Report

[http://localhost:5555/report/monthly_view-operation_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4](http://localhost:5555/report/monthly_view-operation_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4)

### Add new Report
SEE POSTMAN

### Remove a Report
```sh
curl -X DELETE "http://localhost:5555/report/monthly_view-operation_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4"
```
