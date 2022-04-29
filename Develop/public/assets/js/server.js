const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
);

// GET Route for feedback page
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db.json'))
);

app.post('/api/notes', (req, res) => {
    res.send("POST Request Called")
  })
    
  app.listen(PORT, function(err){
      if (err) console.log(err);
      console.log("Server listening on PORT", PORT);
  }); 



