import { Router } from 'express'
import * as albumsCtrl from "../controllers/albums.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET - /albums
router.get('/', albumsCtrl.index)
router.get('/new', isLoggedIn, albumsCtrl.new)
router.get('/:id', isLoggedIn, albumsCtrl.show)
router.get('/:id/edit', isLoggedIn, albumsCtrl.edit)
router.get('/:id/reviews', isLoggedIn, albumsCtrl.newReview)

//POST- /albums
router.post('/', isLoggedIn, albumsCtrl.create)
router.post('/:id', isLoggedIn, albumsCtrl.createReview)

// PUT - /albums/:id
router.put('/:id', isLoggedIn, albumsCtrl.update)

//DELETE
router.delete('/:id', isLoggedIn, albumsCtrl.delete)

export {
  router 
}