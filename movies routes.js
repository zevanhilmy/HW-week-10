const express = require('express');
const pool = require('../database');
const multer = require('multer');
const MovieRepository = require('../repositories/movieRepository');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('photo'), async (req, res) => {
  const { title, genres, year } = req.body;
  const photo = req.file ? req.file.path : null;

  if (!title || !genres || !year) {
    return res.status(400).json({ error: 'Harap masukkan title, genres, dan year' });
  }

  try {
    const result = await MovieRepository.addMovie(title, genres, year, photo);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error while adding movie:', error);
    res.status(500).json({ error: 'Gagal menambahkan film' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await MovieRepository.deleteMovie(id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error while deleting movie:', error);
    res.status(500).json({ error: 'Gagal menghapus film' });
  }
});

router.put('/:id', upload.single('photo'), async (req, res) => {
  const id = req.params.id;
  const { title, genres, year } = req.body;
  const photo = req.file ? req.file.path : null;

  if (!title || !genres || !year) {
    return res.status(400).json({ error: 'Harap masukkan title, genres, dan year' });
  }

  try {
    const result = await MovieRepository.updateMovie(id, title, genres, year, photo);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error while updating movie:', error);
    res.status(500).json({ error: 'Gagal memperbarui film' });
  }
});

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await MovieRepository.getAllMovies(offset, limit);
    res.json(result.rows);
  } catch (error) {
    console.error('Error while getting list of movies:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
