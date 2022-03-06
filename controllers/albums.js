import { Album } from "../models/album.js"

function newAlbum(req, res) {
  res.render('albums/new', {
    title: 'Enter A New Album'
  })
}

function create(req, res) {
  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  const album = new Album(req.body)
  album.save(function(error){
    if (error) 
    return res.render('albums/new')
    res.redirect('/albums')
  })
}

function index(req, res) {
  Album.find({}, function(error, albums){
    res.render('albums/index', {
      albums,
      error,
      title: 'All Albums',
    })
  })
}


export {
  newAlbum as new,
  create,
  index,
}