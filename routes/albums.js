import { Router } from 'express'
import * as albumsCtrl from "../controllers/albums.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET - /albums/new
router.get('/new', albumsCtrl.new)

//POST- /albums
router.post('/', isLoggedIn, albums.Ctrl.create)

export {
  router 
}