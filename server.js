import express from 'express'
import multer from 'multer' // install this package to add file object to req (ref: https://www.npmjs.com/package/multer)
const app = express()
import cors from 'cors'
import 'dotenv/config'

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

const upload = multer({ dest: 'uploads/' })
app.post("/api/fileanalyse", upload.single('upfile'), async function (req, res) {
  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});