const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/sendFile.html'))
);

app.get('/notes', (req, res) => {
console.log("hi i made it")
  res.sendFile(path.join(__dirname, 'public/notes.html'))
}

);

app.get('/api/notes', (req, res) => {
  console.log("hi i made it")
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  // console.log (res); 
  }
);
app.post('/api/notes', (req, res) => {
  // console.info(`${req.method}`);
  console.log(`${req}`);

  const { NoteTitle, NoteText,  } = req;
  if (req.body) {
    const newNote = {
      NoteTitle,
      NoteText,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
