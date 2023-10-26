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
      const [movieGenre] = await connection.query(
        ` SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate 
          FROM movie 
          INNER JOIN movie_genres ON movie.id = movie_genres.movie_id 
          INNER JOIN genres ON movie_genres.genre_id = genres.id 
          WHERE LOWER(genres.name) = ?`,
        [lowerCaseGenre]
      )

      return movieGenre
    }
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
    )
    return movies
  }

  static async getById({ id }) {
    const [movieID] = await connection.query(
      ` SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate
        FROM movie  
        WHERE id = UUID_TO_BIN(?)`,
      [id]
    )
    if (movieID.length === 0) return null

    return movieID[0]
  }

  static async create({ input }) {
    const {
      // genre: genreInput, () hacer los generos
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() as uuid;')
    const { uuid } = uuidResult[0]

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
          VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      `SELECT id, title, year, director, duration, poster, rate 
        FROM movie 
        WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete({ id }) {
    try {
      const result = await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?)',
        [id]
      )
      if (result.affectedRows === 0) {
        throw new Error('Movie not found')
      }
      console.log('movie deleted', id)
      return true
    } catch (e) {
      throw new Error('Movie not deleted')
    }
  }

  static async update({ id, input }) {
    const { title, year, duration, director, rate, poster } = input
    const updateFields = []

    if (title) {
      updateFields.push(`title = '${title}'`)
    }
    if (year) {
      updateFields.push(`year = ${year}`)
    }
    if (duration) {
      updateFields.push(`duration = ${duration}`)
    }
    if (director) {
      updateFields.push(`director = '${director}'`)
    }
    if (rate) {
      updateFields.push(`rate = ${rate}`)
    }
    if (poster) {
      updateFields.push(`poster = '${poster}'`)
    }

    if (updateFields.length === 0) {
      console.log('No se especificaron campos para actualizar.')
    }

    const setValues = updateFields.join(', ')

    const [result] = await connection.query(
      `UPDATE movie SET ${setValues} WHERE id = UUID_TO_BIN(?)`,
      [id]
    )

    if (result.affectedRows > 0) {
      const [updatedMovie] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)',
        [id]
      )
      return updatedMovie
    } else {
      console.log('No se pudo actualizar la película.')
    }
  }
}
