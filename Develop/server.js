const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/api/notes', (req, res) =>
  res.readFile(path.join(__dirname, '/db.json'))
);

app.post('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db.json')
)});
    
  app.listen(PORT, function(err){
      if (err) console.log(err);
      console.log("Server listening on PORT", PORT);
  }); 

