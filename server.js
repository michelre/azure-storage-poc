import 'babel-polyfill';
import express from 'express';
import multer from 'multer';
import basicAuth from 'basic-auth';

import { createShare, uploadFile, getReport,
  listReports, deleteReport } from './azure-storage';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

const auth = function (req, res, next) {
  const unauthorized = (res) => {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};

app.get('/status', (req, res) => {
  res.send({ status: 'OK' });
});

app.post('/report', auth, upload.single('report'), (req, res) => {
  const { partner, customer, site, type, country } = req.query;
  uploadFile(req.file, [country, partner, customer, site, type])
    .then((d) => res.send({ status: 'OK' }))
    .catch(err => res.status(500).send(err));
});

app.get('/report/:name', auth, (req, res) => {
  const { country, partner, customer, site, type } = req.query;
  getReport([country, partner, customer, site, type], req.params.name, res);
});

app.get('/reports', auth, (req, res) => {
  const { country, partner, customer, site, type } = req.query;
  listReports([country, partner, customer, site, type]).then(reports => res.send(reports));
});

app.delete('/report', auth, (req, res) => {
  const { country, partner, customer, site, type, report } = req.query;
  deleteReport([country, partner, customer, site, type, report])
    .then(() => res.send({ status: 'OK'}));
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
