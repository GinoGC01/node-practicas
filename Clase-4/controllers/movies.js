import { MovieModel } from '../models/Local-file-sistem/movies.js'
import { validateMovie, validatePartialMovie } from '../Schemas/movies.js'

export class MoviesController {
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre }) // peliculas

    res.json(movies)
  }

  static async getById(req, res) {
    const { id } = req.params
    // recupera la pelicula
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not finded' })
  }

  static async createMovie(req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async updateMovie(req, res) {
    const result = validatePartialMovie(req.body)
    // valida los datos
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    // actualiza los datos
    const { id } = req.params // id película

    const updateMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updateMovie)
  }

  static async deleteMovie(req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (!result) {
      return res.status(404).json({ message: 'Movie not fund' })
    }

    return res.status(204).json({ message: 'Movie deleted' })
  }
}
