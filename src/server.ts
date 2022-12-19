import express from  'express';
import payload from 'payload';
import fileUpload from 'express-fileupload';

import bodyParser from 'body-parser';

require('dotenv').config();
const app = express();

app.get('/', (_, res) => {
  res.redirect('/admin');
});

payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './assets'
}));
app.listen(3000);