import 'babel-polyfill';
import express from 'express';
import multer from 'multer';

import { createShare, uploadFile, getReport,
  listReports, deleteReport } from './azure-storage';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

app.get('/status', (req, res) => {
  res.send({ status: 'OK' });
});

app.post('/report', upload.single('report'), (req, res) => {
  const { partner, customer, site } = req.query;
  uploadFile(req.file, [partner, customer, site].join('/'))
    .then((d) => res.send({ status: 'OK' }))
    .catch(err => res.status(500).send(err));
});

//http://localhost:5555/report/monthly_improve-energy_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4
app.get('/report/:name', (req, res) => {
  const { partner, customer, site } = req.query;
  getReport([partner, customer, site, req.params.name].join('/'), res);
});

//http://localhost:5555/report/multi_improve-hvac_cop-culoz_en_2016-01-01_2016-06-30.pptx?partner=climateck
app.get('/reports', (req, res) => {
  const { partner, customer, site } = req.query;
  listReports(partner, customer, site).then(reports => res.send(reports));
});

//http://localhost:5555/report/multi_improve-hvac_cop-culoz_en_2016-01-01_2016-06-30.pptx?partner=climateck&customer=mairie-culoz&site=pac-creche-culoz
app.delete('/report/:name', (req, res) => {
  const { partner, customer, site } = req.query;
  deleteReport([partner, customer, site, req.params.name].join('/'))
    .then(() => res.send({ status: 'OK'}));
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
