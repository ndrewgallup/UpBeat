import { Router } from 'express'
import * as albumsCtrl from "../controllers/albums.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//GET - localhost:3000/albums/new
router.get('/albums', albumsCtrl.new)

export {
  router 
}