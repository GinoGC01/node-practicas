import { Router } from 'express'
import { MoviesController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MoviesController.getAll)
moviesRouter.post('/', MoviesController.createMovie)

moviesRouter.get('/:id', MoviesController.getById)
moviesRouter.patch('/:id', MoviesController.updateMovie)
moviesRouter.delete('/:id', MoviesController.deleteMovie)
