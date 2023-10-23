import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'db_movies'
}
const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database rable using genre names
      // find the genre in database
      const [genres] = await connection.query(
        'SELECT id, name FROM genres WHERE LOWER(name) = ?',
        [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      // const [{ id }] = genres

      // get all movies id from database table
      // la query a movie_genres
      // join
      // return results...
      const [moviesGenres] = await connection.query(
        ` SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate 
          FROM movie 
          INNER JOIN movie_genres ON movie.id = movie_genres.movie_id 
          INNER JOIN genres ON movie_genres.genre_id = genres.id 
          WHERE LOWER(genres.name) = ?`,
        [lowerCaseGenre]
      )

      return moviesGenres
    }
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
    )
    return movies
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
