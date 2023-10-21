// repositories/movieRepository.js

const MovieModel = require('../models/movie');

class MovieRepository {
  static getAllMovies(offset, limit) {
    return MovieModel.getAllMovies(offset, limit);
  }

  static getMovieById(id) {
    return MovieModel.getMovieById(id);
  }

  static addMovie(title, genres, year, photo) {
    return MovieModel.addMovie(title, genres, year, photo);
  }

  static updateMovie(id, title, genres, year, photo) {
    return MovieModel.updateMovie(id, title, genres, year, photo);
  }

  static deleteMovie(id) {
    return MovieModel.deleteMovie(id);
  }
}

module.exports = MovieRepository;
