require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const { omdbKey, port } = require('./config/keys');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

const api = `http://www.omdbapi.com/?apikey=${omdbKey}`;

app.get('/movies/get/:movie/:year?', (req, res) => {
  const movieT = encodeURIComponent(req.params.movie);
  const movieY = Number(req.params.year);
  let getParams = '';

  if (!req.params.year) {
    getParams = `&t=${movieT}`;
  } else {
    getParams = `&t=${movieT}&y=${movieY}`;
  }

  axios
    .get(api + getParams)
    .then((response) => {
      if (response.data.Error) {
        throw new Error(JSON.stringify(response.data));
      }
      res.send(response.data);
    })
    .catch((err) => {
      //console.log(err);
      //res.status(404).send('OOps ((');
      res.status(404).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
