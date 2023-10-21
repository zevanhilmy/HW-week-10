// models/movieModel.js

const pool = require('../database');

class MovieModel {
  static getAllMovies(offset, limit) {
    return pool.query('SELECT * FROM movies OFFSET $1 LIMIT $2', [offset, limit]);
  }

  static getMovieById(id) {
    return pool.query('SELECT * FROM movies WHERE id = $1', [id]);
  }

  static addMovie(title, genres, year, photo) {
    return pool.query('INSERT INTO movies (title, genres, year, photo) VALUES ($1, $2, $3, $4) RETURNING *', [title, genres, year, photo]);
  }

  static updateMovie(id, title, genres, year, photo) {
    return pool.query('UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5 RETURNING *', [title, genres, year, photo, id]);
  }

  static deleteMovie(id) {
    return pool.query('DELETE FROM movies WHERE id = $1', [id]);
  }
}

module.exports = MovieModel;
