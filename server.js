const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/image/')
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.json({'msg':'hello'});
});

app.get('/upload-disaster', upload.single('selfie_image'), (req, res) => {
  res.json({'body':req.body,'file':req.file});
});

app.listen(3000);
// eslint-disable-next-line no-console
console.log('app running in port 3000');