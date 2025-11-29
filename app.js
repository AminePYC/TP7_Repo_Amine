const express = require('express');
const bodyParser = require('body-parser');
const Livre = require('./models/Livre');
require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('API is working — use /livres to interact with the library');
});

// Create
app.post('/livres', async (req, res) => {
  try {
    const livre = new Livre(req.body);
    await livre.save();
    res.status(201).json({ message: 'Livre ajouté', livre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all
app.get('/livres', async (req, res) => {
  try {
    const livres = await Livre.find();
    res.status(200).json(livres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update by id
app.put('/livres/:id', async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json({ message: 'Livre mis à jour', livre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete by id
app.delete('/livres/:id', async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
