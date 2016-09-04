import 'babel-polyfill';
import express from 'express';
import multer from 'multer';

import { createShare, uploadFile, getReport } from './azure-storage';

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

//http://localhost:5555/file/monthly_improve-energy_prod-to-m4_en_2016-06-01_2016-06-30.pdf?partner=r-g-project&customer=stable-sites&site=m4
app.get('/file/:name', (req, res) => {
  const { partner, customer, site } = req.query;
  getReport([partner, customer, site, req.params.name].join('/'), res);
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
