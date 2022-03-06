import { Router } from 'express'
import * as albumsCtrl from "../controllers/albums.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET - /albums
router.get('/', albumsCtrl.index)
router.get('/new', isLoggedIn, albumsCtrl.new)
router.get('/:id', isLoggedIn, albumsCtrl.show)

//POST- /albums
router.post('/', isLoggedIn, albumsCtrl.create)

export {
  router 
}