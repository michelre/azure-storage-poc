import fs from 'fs';

export default JSON.parse(fs.readFileSync(`${__dirname}/conf.json`, 'utf-8'));
